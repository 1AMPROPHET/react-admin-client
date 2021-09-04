export const menuList = [
  {
    text: "Home",
    link: "/home",
    key: 1,
    icon: "HomeOutlined"
  },
  {
    text: "User",
    link: "/user",
    key: 2,
    icon: "UserOutlined"
  },
  {
    text: "Role",
    link: "/role",
    key: 3,
    icon: "UsergroupAddOutlined"
  },
  {
    text: "Product",
    link: "/products",
    key: 4,
    icon: "AppstoreAddOutlined",
    subMenu: [
      {
        text: "Category",
        key: 6,
        icon: "UnorderedListOutlined",
        link: '/category'
      },
      {
        text: "Products Manager",
        key: 7,
        icon: "ProfileOutlined",
        link: '/product'
      }
    ]
  },
  {
    text: "Chart",
    link: "/charts",
    key: 5,
    icon: "AreaChartOutlined",
    subMenu: [
      {
        text: "Bar",
        key: 8,
        icon: "BarChartOutlined",
        link: '/charts/bar'
      },
      {
        text: "Line",
        key: 9,
        icon: "LineChartOutlined",
        link: '/charts/line'
      },
      {
        text: "Pie",
        key: 10,
        icon: "PieChartOutlined",
        link: '/charts/pie'
      }
    ]
  }
]