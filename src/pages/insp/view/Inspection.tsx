import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import {
  AutocompleteElement,
  FormContainer,
  useFormContext,
} from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'
import { Equalizer, Topic } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
  iInspection,
  useAppThemeContext,
  apiInspection,
  apiCod,
  iCodErr,
} from '../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iViewInspectionProps {
  inspection: iInspection
}

const Finish = ({ total }: { total: number }) => {
  const { setValue } = useFormContext()
  let n = 1

  useEffect(() => {
    while (n <= total) {
      setValue(`cod-${n}`, {
        id: 'f551d8e6-935f-4d6e-9935-7f538d8e5e69',
        label: 'C - Conforme',
      })
      n++
    }
  }, [total])

  return (
    <Button variant="contained" type="submit" fullWidth>
      Enviar
    </Button>
  )
}

export const ViewInspection = ({ inspection }: iViewInspectionProps) => {
  const navigate = useNavigate()
  const { theme, handleSucess, handleError, setLoading } = useAppThemeContext()
  const [codErrData, setCodErrData] = useState<iCodErr[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const formsData = []
  let n = 1

  while (n <= inspection.total) {
    formsData.push(
      <AutocompleteElement
        key={n}
        name={`cod-${n}`}
        label={`Problema - Par ${n}`}
        loading={loadingData}
        options={
          codErrData.length > 0
            ? codErrData
            : [
                {
                  id: 1,
                  label: 'No momento, não há nenhum cod cadastrado',
                },
              ]
        }
        autocompleteProps={{
          fullWidth: true,
        }}
      />,
    )
    n++
  }

  const cancel = () => {
    setLoading(true)
    apiInspection
      .destroy(inspection.id)
      .then(() => {
        handleSucess('Cancelado com sucesso')
        navigate(`/insp/${inspection.sector.unit.id}/${inspection.sector.key}`)
      })
      .catch(() => handleError('não foi possível cancelar no momento'))
      .finally(() => setLoading(false))
  }

  const finish = async (data: iCodErr[]) => {
    setLoading(true)
    try {
      await apiInspection.createSample(inspection.id, { cods: data })
      await apiInspection.update(inspection.id, {
        finished_at: dayjs().diff(dayjs(inspection.created_at).utc(), 's'),
      })
      handleSucess('Análise registrada com sucesso')
      navigate(`/insp/${inspection.sector.unit.id}/${inspection.sector.key}`)
    } catch {
      handleError('Não foi possível registrar a análise no momento')
    } finally {
      setLoading(false)
    }
  }

  const getCodErr = () => {
    setLoadingData(true)
    apiCod
      .list(`?sector_id=${inspection.sector.sector.id}`)
      .then((res) => setCodErrData(res.result))
      .finally(() => setLoadingData(false))
  }

  useEffect(() => getCodErr(), [])

  return (
    <Grid item xs={12} md={9} width="100%">
      <Box mb={2} component={Paper}>
        <Box
          height={theme.spacing(7)}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography
            component="div"
            variant="h6"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Topic />
            Ficha
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography textAlign="center">
                {inspection.file.ficha} - {inspection.file.product.ref} -{' '}
                {inspection.file.product.name} - {inspection.total}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mb={2} component={Paper}>
        <Box
          height={theme.spacing(7)}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography
            component="div"
            variant="h6"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Equalizer />
            Análise
          </Typography>
          <Button variant="contained" color="secondary" onClick={cancel}>
            Cancelar
          </Button>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <FormContainer
                onSuccess={(data) => {
                  const arrData: iCodErr[] = []
                  Object.values<iCodErr | undefined>(data).forEach((el) => {
                    if (el) arrData.push(el)
                  })
                  finish(arrData)
                }}
              >
                <Box mt={1} display="flex" flexDirection="column" gap={1.5}>
                  {formsData.map((el) => el)}
                  <Finish total={inspection.total} />
                </Box>
              </FormContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}
