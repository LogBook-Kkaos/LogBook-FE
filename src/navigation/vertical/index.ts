import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Icon Imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import ChatOutline from 'mdi-material-ui/MessageTextOutline'
import TimelineTextOutline from 'mdi-material-ui/TimelineTextOutline'
import ControlPointOutlinedIcon from 'mdi-material-ui/PlusCircleOutline'

// ** Type Imports
import { VerticalNavItemsType } from 'src/@core/layouts/types'

// ** HTTP Client
import axios from 'axios'

import { useRecoilValue } from 'recoil'

import { tokensState } from 'src/recoil/auth/atoms'
import { loginUserState } from 'src/recoil/user/atoms'

interface MyProject {
  title: string
  path?: string
  icon?: string | string[]
}

const navigation = (): VerticalNavItemsType => {
  const router = useRouter()
  const [myProject,setMyProject]=useState<MyProject[]>([])
  const { accessToken } = useRecoilValue(tokensState)
  const loginUser = useRecoilValue(loginUserState)
  const email = loginUser.email
  
  const headers = { Authorization: `Bearer ${accessToken}` }

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (accessToken) {
          const projectsResponse = await axios.get('/api/users/myproject', {
            headers,
            params: { email }
          });
  
          const projectItems = projectsResponse.data.result.map((project: any) => ({
            title: project.projectName,
            icon: TimelineTextOutline,
            path: `/project-detail/${project.projectId}`,
          }));

          projectItems.sort((a:MyProject, b: MyProject) => {
            const compare = a.title.localeCompare(b.title, 'ko', { numeric: true });
            return compare;
          });
  
          setMyProject(projectItems);
          console.log(projectsResponse);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
  
    fetchMenuItems();

  }, [router.asPath]);

  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Projects'
    },
    ...myProject,
    {
      popupTitle: 'Project Add',
      icon: ControlPointOutlinedIcon
    },
    {
      sectionTitle: 'Channer'
    },
    {
      popupTitle: 'Notification',
      icon: BellOutline
    },
    {
      popupTitle: 'Chatting',
      icon: ChatOutline
    },
  ]
}

export default navigation
