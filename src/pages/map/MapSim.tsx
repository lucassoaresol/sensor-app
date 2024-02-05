import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import {
  LayoutFullBasePage,
  apiDump,
  apiUser,
  iDump,
  iLocation,
  iRoute,
  useAppThemeContext,
} from '../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import { icon } from 'leaflet'
dayjs.extend(localizedFormat)

export const MapSimPage = () => {
  const { lat, long } = useParams()
  const { setLoading, smDown } = useAppThemeContext()
  const [dumps, setDumps] = useState<iDump[]>([])
  const [dumpData, setDumpData] = useState<iDump>()
  const [nextDumps, setNextDumps] = useState<iDump[]>([])
  const [routeData, setRouteData] = useState<iRoute>()
  const [reserveData, setReserveData] = useState<iRoute>()
  const [collectionData, setCollectionData] = useState<iRoute>()
  const [open, setOpen] = useState(false)
  const [totalSecond, setTotalSecond] = useState(0)
  const hora = Math.floor(totalSecond / 3600)
  const minute = Math.floor(totalSecond / 60)
  const second = totalSecond % 60

  const handleDump = (newDump: iDump) => setDumpData(newDump)
  const handleOpen = () => setOpen((old) => !old)

  const locationData: iLocation = useMemo(() => {
    return {
      lat: Number(lat),
      lon: Number(long),
    }
  }, [lat, long])

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
          lat: Number(lat),
          lon: Number(long),
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
      {smDown ? (
        <div className="ml-3 w-full">
          <MapContainer
            center={[Number(lat), Number(long)]}
            zoom={16}
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
            <Marker
              position={[locationData.lat, locationData.lon]}
              icon={icon({ iconUrl: '/locale.svg' })}
            >
              <Popup>Você está dentro 100 metros deste ponto</Popup>
            </Marker>
          </MapContainer>
          <div className="mt-1 flex overflow-x-scroll gap-1">
            {nextDumps.map((el) => (
              <div key={el.id}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      handleDump(el)
                      handleOpen()
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        fontWeight="bold"
                        component="div"
                      >
                        {el.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {el.prc.toFixed(2)}% - {el.distance}m
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <MapContainer
              center={[Number(lat), Number(long)]}
              zoom={16}
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
              <Marker
                position={[locationData.lat, locationData.lon]}
                icon={icon({ iconUrl: '/locale.svg' })}
              >
                <Popup>Você está dentro 100 metros deste ponto</Popup>
              </Marker>
              <Circle
                center={[locationData.lat, locationData.lon]}
                pathOptions={{ fillColor: 'blue' }}
                radius={100}
              />
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
                      <Typography
                        gutterBottom
                        fontWeight="bold"
                        component="div"
                      >
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
      )}
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
              href={`https://www.google.com/maps/dir/${locationData.lat},${locationData.lon}/${routeData.dump.lat},${routeData.dump.lon}`}
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
