import { Injectable } from '@angular/core';
import { provideRoutes } from '@angular/router';
import { INavData } from '@coreui/angular';


export const navItemsAdmin: INavData[] = [
  {

    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',

  },

  {

    name: 'Test colis',
    url: ' ',
    icon: 'icon-user',
    children: [
      {
        name: 'All',
        url: '/dashboard/test',
        icon: 'icon-people'
      },
      {
        name: 'Add',
        url: '/dashboard/test/add',
        icon: 'fa fa-plus-circle'
      },

    ]
  },

  {
    name: 'Users',
    url: ' ',
    icon: 'icon-user',
    children: [
      {
        name: 'All',
        url: '/dashboard/users',
        icon: 'icon-people'
      },
      {
        name: 'Add',
        url: '/dashboard/users/add',
        icon: 'fa fa-plus-circle'
      },

    ]
  },
  {
    name: 'Colis',
    url: ' ',
    icon: 'icon-user',
    children: [
      {
        name: 'All',
        url: '/dashboard/colis',
        icon: 'icon-people'
      },
      {
        name: 'Add',
        url: '/dashboard/colis/add',
        icon: 'fa fa-plus-circle'
      },
      {
        name: 'EN TRITEMENT',
        url: '/dashboard/colis/non_envoye',
        icon: 'fa fa-plus-circle'
      },



    ]
  },
  {
    name: 'Bons',
    url: ' ',
    icon: 'icon-user',
    children: [
      {
        name: 'All',
        url: '/dashboard/bon',
        icon: 'icon-people'
      },
      // {
      //   name: 'Add',
      //   url: '/dashboard/bon/add',
      //   icon: 'fa fa-plus-circle'
      // },

    ]
  },

  {
    name: 'Companies',
    url: '/dashboard/companies',
    icon: 'icon-rocket',
    children: [
      {
        name: 'All',
        url: '/dashboard/companies',
        icon: 'icon-grid'
      },
      {
        name: 'Add',
        url: '/dashboard/companies/add',
        icon: 'fa fa-plus-circle'
      },


    ]
  },

  {
    name: 'Cash',
    url: '/dashboard/cash',
    icon: 'icon-money',
    children: [
      {
        name: 'All',
        url: '/dashboard/cash',
        icon: 'icon-grid'
      },
      {
        name: 'Add',
        url: '/dashboard/cash/add',
        icon: 'fa fa-plus-circle'
      },


    ]
  },

  {
    name: 'Stock',
    icon: 'fa fa-archive',
    url: ' ',
    children: [
      {
        name: 'orders',
        url: '/dashboard/orders',
        icon: 'fa fa-handshake-o',
        children: [
          {
            name: 'All',
            url: '/dashboard/orders',
            icon: 'icon-grid'
          },
          {
            name: 'Add',
            url: '/dashboard/orders/add',
            icon: 'fa fa-plus-circle'
          },


        ]
      },
      {
        name: 'Products',
        url: '/dashboard/products',
        icon: 'fa fa-product-hunt',
        children: [
          {
            name: 'All',
            url: '/dashboard/products',
            icon: 'icon-grid'
          },
          {
            name: 'Add',
            url: '/dashboard/products/add',
            icon: 'fa fa-plus-circle'
          },


        ]
      },
      {
        name: 'Categories',
        url: '/dashboard/categories',
        icon: 'fa fa-shopping-basket',
        children: [
          {
            name: 'All',
            url: '/dashboard/categories',
            icon: 'icon-grid'
          },
          {
            name: 'Add',
            url: '/dashboard/categories/add',
            icon: 'fa fa-plus-circle'
          },


        ]
      },
    ]


  },

  {
    name: 'Setting',
    icon: 'fa fa-cog',
    url: ' ',
    children: [
      {
        name: 'Villes',
        url: '/dashboard/villes',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/villes',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/villes/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },
      {
        name: 'Villes Names',
        url: '/dashboard/villesnames',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/villesnames',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/villesnames/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },

      {
        name: 'Networks',
        url: '/dashboard/networks',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/networks',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/networks/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },
      {
        name: 'Enumeration',
        url: '/dashboard/enumerations',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/enumerations',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/enumerations/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },

      {
        name: 'Enumeration Value',
        url: '/dashboard/enumerations_value',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/enumerations_value',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/enumerations_value/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },
      {
        name: 'Roles',
        url: '/dashboard/role',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/role',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/role/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },
      {
        name: 'resources',
        url: '/dashboard/resources',
        icon: 'icon-wrench',
        children: [
          {
            name: 'All',
            url: '/dashboard/resources',
            icon: 'icon-book-open'
          },
          {
            name: 'Add',
            url: '/dashboard/resources/add',
            icon: 'fa fa-plus-circle'
          },

        ]
      },

    ]

  },



];






