// ** React Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

interface LatestReleaseProps {
  projectId: string
  headers: any
}

interface ReleaseNoteInfo {
  releaseNoteId: string
  version: string
  releaseTitle: string
}

const LatestRelease : React.FC<LatestReleaseProps> = ({ projectId, headers }) => {
  const router = useRouter()
  const [ releaseNotes, setReleaseNotes ] = useState<ReleaseNoteInfo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ReleaseNoteResponse = await axios.get(`/api/projects/${projectId}/release_notes`, { headers });
        const sortedResult = ReleaseNoteResponse.data.result.sort((a: any, b: any) => {
          const dateA = new Date(a.creationDate);
          const dateB = new Date(b.creationDate);
          return dateB.getTime() - dateA.getTime();
        });
        
        const formattedReleaseNotes = sortedResult.slice(0, 5).map((item: any) => ({
          releaseNoteId: item.releaseNoteId,
          version: item.version,
          releaseTitle: item.releaseTitle,
        }));

        setReleaseNotes(formattedReleaseNotes);
        
      } catch (error) {
        console.error('Error fetching releasenote information:', error);
      }
    };
      fetchData();
  }, [projectId])

  const handleViewAll = (projectId : any) => {
    router.push(`/project-detail/${projectId}?activeTab=release-note`);
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'], height:'100%'
     }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='최근 릴리즈'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={
            <Typography
              variant='caption'
              onClick={() => handleViewAll(projectId)}
              style={{ cursor: 'pointer' }}>
              View All
            </Typography>
          }
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {releaseNotes.map((item: ReleaseNoteInfo, index: number) => {
            return (
              <Box
                key={item.releaseNoteId}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== releaseNotes.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.version}</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.releaseTitle}</Typography>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>
    </Card>
  )
}

export default LatestRelease
