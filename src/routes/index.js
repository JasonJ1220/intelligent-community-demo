import { router } from 'oss-web-common';

const routes = [
    {
        exact: true,
        path: '/',
        component: 'test',
        routes: [],
    },
    {
        exact: true,
        path: '/test',
        component: 'test',
        routes: [],
    },
    {
        exact: true,
        path: '/home',
        component: 'home',
        routes: [],
    },
];

const allRoutes = router.buildRoutes(routes);

export default allRoutes;
