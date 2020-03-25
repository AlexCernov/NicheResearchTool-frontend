import BarChartIcon from '@material-ui/icons/BarChart';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SearchIcon from '@material-ui/icons/Search';
export default [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Home',
        href: '/',
        icon: HomeIcon
      },
      {
        title: 'Amazon live research',
        href: '/amazon',
        icon: BarChartIcon,
        children: [
          {
            title: 'Search',
            href: '/amazon',
            icon: SearchIcon
          },
          {
            title: 'Saved items',
            href: '/amazon/saved',
            icon: FolderIcon
          }
        ]
      },
      {
        title: 'Alibaba live research',
        href: '/alibaba',
        icon: ReceiptIcon,
        children: [
          {
            title: 'Search',
            href: '/alibaba',
            icon: SearchIcon
            
          },
          {
            title: 'Saved items',
            href: '/alibaba/saved',
            icon: FolderIcon
          }
        ]
      }
    ]
  }
]