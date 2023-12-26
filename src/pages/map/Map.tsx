import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import {
  LayoutFullBasePage,
  apiDump,
  apiUser,
  iDump,
  iLocation,
  iRoute,
  useAppThemeContext,
} from '../../shared'
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

const LocationMarker = ({
  handleLocation,
}: {
  handleLocation: (newLocation: iLocation) => void
}) => {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 16)
      handleLocation({ lat: e.latlng.lat, lon: e.latlng.lng })
    },
  })

  useEffect(() => {
    map.locate()
  }, [])

  return <></>
}

export const MapPage = () => {
  const { setLoading } = useAppThemeContext()
  const [dumps, setDumps] = useState<iDump[]>([])
  const [dumpData, setDumpData] = useState<iDump>()
  const [nextDumps, setNextDumps] = useState<iDump[]>([])
  const [locationData, setLocationData] = useState<iLocation>()
  const [routeData, setRouteData] = useState<iRoute>()
  const [reserveData, setReserveData] = useState<iRoute>()
  const [collectionData, setCollectionData] = useState<iRoute>()
  const [open, setOpen] = useState(false)
  const [totalSecond, setTotalSecond] = useState(0)
  const hora = Math.floor(totalSecond / 3600)
  const minute = Math.floor(totalSecond / 60)
  const second = totalSecond % 60

  const handleLocation = (newLocation: iLocation) =>
    setLocationData(newLocation)
  const handleDump = (newDump: iDump) => setDumpData(newDump)
  const handleOpen = () => setOpen((old) => !old)

  const refreshUser = () => {
    setLoading(true)
    apiUser
      .refresh(`?lat=${locationData?.lat}&lon=${locationData?.lon}`)
      .then((res) => {
        setNextDumps(res.next_dump)
        setRouteData(res.route)
        setReserveData(res.reserve)
        setCollectionData(res.collection)
        if (res.route) {
          const expired_at = dayjs(res.route.created_at).add(1, 'h')
          setTotalSecond(expired_at.diff(dayjs(), 's'))
        } else if (res.reserve) {
          const expired_at = dayjs(res.reserve.created_at).add(5, 'minute')
          setTotalSecond(expired_at.diff(dayjs(), 's'))
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    apiDump
      .list('')
      .then((res) => setDumps(res))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => refreshUser(), [locationData])

  useEffect(() => {
    if (collectionData) {
      setTotalSecond(dayjs().diff(collectionData.created_at, 's'))
      setTimeout(() => {
        refreshUser()
      }, 1000)
    } else {
      if (totalSecond === 0) {
        refreshUser()
      } else {
        setTimeout(() => {
          setTotalSecond(totalSecond - 1)
        }, 1000)
      }
    }
  }, [totalSecond, collectionData])

  const createRoute = (dump_id: number) => {
    handleOpen()
    setLoading(true)
    apiDump
      .route(
        {
          date: dayjs().format('DD/MM/YYYY'),
          lat: Number(locationData?.lat),
          lon: Number(locationData?.lon),
          month: dayjs().format('MMMM'),
          year: dayjs().year(),
        },
        dump_id,
      )
      .then(() => refreshUser())
      .finally(() => setLoading(false))
  }

  const updateRoute = (status: 'CANCELED' | 'CONCLUDED', route_id: string) => {
    setLoading(true)
    apiDump
      .updateRoute(
        {
          status,
        },
        route_id,
      )
      .then(() => refreshUser())
      .finally(() => setLoading(false))
  }

  const createReserve = (dump_id: number) => {
    setLoading(true)
    apiDump
      .reserve(dump_id)
      .then(() => refreshUser())
      .finally(() => setLoading(false))
  }

  const createCollection = (dump_id: number) => {
    setLoading(true)
    apiDump
      .collection(
        {
          date: dayjs().format('DD/MM/YYYY'),
          month: dayjs().format('MMMM'),
          year: dayjs().year(),
        },
        dump_id,
      )
      .then(() => refreshUser())
      .finally(() => setLoading(false))
  }

  const updateCollection = (value: number, collection_id: string) => {
    setLoading(true)
    apiDump
      .updateCollection(
        {
          value,
          status: 'CONCLUDED',
        },
        collection_id,
      )
      .then(() => refreshUser())
      .finally(() => setLoading(false))
  }

  return (
    <LayoutFullBasePage>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <MapContainer
            center={[-3.7687699, -38.4806359]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '78vh' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dumps.map((el) => (
              <Marker key={el.id} position={[el.lat, el.lon]} />
            ))}
            <LocationMarker handleLocation={handleLocation} />
          </MapContainer>
        </Grid>
        <Grid container item xs={2} spacing={1}>
          {nextDumps.map((el) => (
            <Grid item xs={12} key={el.id}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    handleDump(el)
                    handleOpen()
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom fontWeight="bold" component="div">
                      {el.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {el.prc.toFixed(2)}% - {el.distance}m
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {dumpData && (
        <>
          {Number(dumpData?.distance) < 1 ? (
            <Dialog
              open={open}
              onClose={handleOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Coletar {dumpData.label}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Você está próximo de uma lixeira dispónivel para coleta,
                  clique em iniciar para coletar
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    createCollection(dumpData.id)
                  }}
                >
                  Iniciar
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            <Dialog
              open={open}
              onClose={handleOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Deslocar até {dumpData.label}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Preenchido:{dumpData.prc.toFixed(2)}% - Distância:
                  {dumpData.distance}m
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    createRoute(dumpData.id)
                  }}
                >
                  Ir até lá
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
      {routeData && (
        <Dialog
          open
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Em Rota até {routeData.dump.label}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography textAlign="center">
                Você tem {hora.toString().padStart(2, '0')}:
                {(minute - hora * 60).toString().padStart(2, '0')}:
                {second.toString().padStart(2, '0')} para chegar no seu destino
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              href={`https://www.google.com/maps/dir/${locationData?.lat},${locationData?.lon}/${routeData.dump.lat},${routeData.dump.lon}`}
              target="_blank"
            >
              Direções
            </Button>
            <Button
              onClick={() => {
                updateRoute('CONCLUDED', routeData.id)
                createReserve(routeData.dump.id)
              }}
              disabled={Number(routeData.dump.distance) > 1}
            >
              Cheguei
            </Button>
            <Button onClick={() => updateRoute('CANCELED', routeData.id)}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {reserveData && (
        <Dialog
          open
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Coletar {reserveData.dump.label}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você tem {hora.toString().padStart(2, '0')}:
              {(minute - hora * 60).toString().padStart(2, '0')}:
              {second.toString().padStart(2, '0')} para iniciar sua coleta
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                createCollection(reserveData.dump.id)
              }}
            >
              Iniciar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {collectionData && (
        <Dialog
          open
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Coletando {collectionData.dump.label}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {hora.toString().padStart(2, '0')}:
              {(minute - hora * 60).toString().padStart(2, '0')}:
              {second.toString().padStart(2, '0')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                updateCollection(collectionData.dump.value, collectionData.id)
              }}
            >
              Finalizar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </LayoutFullBasePage>
  )
}
