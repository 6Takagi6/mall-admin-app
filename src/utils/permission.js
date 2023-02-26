const roleToRoute = {
    coustomer: [
        {
            name: "Product"
        },
        {
            name: 'ProductList'
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'ProductEdit'
        },
    ],
    admin: [
        {
            name: "Product"
        },
        {
            name: 'ProductList'
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'ProductEdit'
        },
        {
            name: 'Category'
        }
    ]
}
/**过滤掉没有权限的路由，得到菜单应该显示的路由
 * @param{String} role
 * @param{array} routes
 */
export default function getMenuRoute(role, routes)//权限人名称  传入的路由    
{
    const allowRoutesName = roleToRoute[role]?.map((item) => item.name);//得到对应权限人员应该显示的路由名

    const resultRoutes = routes.filter((r) => {
        const obj = r;
        if (allowRoutesName.indexOf(r.name) !== -1)  //如果 传入的路由 存在此路由名
        {
            const { children } = obj;
            obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
            return true;
        }
        return false;
    })
    return resultRoutes;
}