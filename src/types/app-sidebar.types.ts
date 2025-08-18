export interface IAppSidebarNavItem {
  title: string
  url: string
  icon?: React.ReactNode
  /** Permisos requeridos (ANY-of). Si no se define, el ítem es visible para todos */
  requiredPermissions?: string[]
}

export interface IAppSidebarNavGroup {
  title: string
  icon?: React.ReactNode
  items: IAppSidebarNavItem[]
}

export type TAppSidebarNavData = (IAppSidebarNavItem | IAppSidebarNavGroup)[]
