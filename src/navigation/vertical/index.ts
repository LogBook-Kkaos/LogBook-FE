// ** Icon Imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import ChatOutline from 'mdi-material-ui/MessageTextOutline'
import TimelineTextOutline from 'mdi-material-ui/TimelineTextOutline'
import ControlPointOutlinedIcon from 'mdi-material-ui/PlusCircleOutline'

// ** Type Imports
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
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
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    },
    {
      sectionTitle: 'Document'
    },
    {
      icon: FileDocumentEditOutline,
      title: 'Create Release Note',
      path: '/create-release-note'
    },
    {
      icon: FileDocumentEditOutline,
      title: 'Create Document',
      path: '/create-document'
    },
    {
      sectionTitle: 'Projects'
    },
    {
      title: 'Project Detail',
      icon: TimelineTextOutline,
      path: '/project-detail'
    },
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
