import { INavData } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
let icon = freeSet
export const navItems: INavData[] = [
  {
    title: true,
    name: 'Vendas'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Venda Delivery',
        url: '/dashDelivery',
        iconComponent:{ name: 'cilTruck' }
      },
      {
        name: 'Venda Comanda',
        url: '/base/breadcrumbs',
        icon: 'cil-fastfood'
      },
    ],
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Perfil'
  },

  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'nav-icon-bullet'
      },
    ]
  },

];
