import * as React from "react"

import { cn } from "@/utils/classes"
import { IconBulletFill, IconCheck, IconChevronLgRight } from "justd-icons"









import {
  Button,
  Collection,
  composeRenderProps,
  Header,
  Menu as MenuPrimitive,
  MenuItem,
  MenuSection,
  MenuTrigger as MenuTriggerPrimitive,
  Separator,
  SubmenuTrigger as SubmenuTriggerPrimitive
} from "react-aria-components"

import { tv } from "tailwind-variants"

import { DropdownItemDetails, dropdownItemStyles, dropdownSectionStyles } from "./dropdown"
import { Keyboard } from "./keyboard"
import { Popover } from "./popover"





const MenuContext = React.createContext({ respectScreen: true })





const Menu = ({ respectScreen = true, ...props }) => {
  return (
    <MenuContext.Provider value={{ respectScreen }}>
      <MenuTriggerPrimitive {...props}>{props.children}</MenuTriggerPrimitive>
    </MenuContext.Provider>
  )
}

const SubMenu = ({ delay = 0, ...props }) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

const menuStyles = tv({
  slots: {
    menu: "z32kk max-h-[calc(var(--visual-viewport-height)-10rem)] sm:max-h-[inherit] overflow-auto rounded-xl p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]",
    popover: "z-50 min-w-40 p-0 outline-none shadow-sm",
    trigger: [
      "inline relative text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary pressed:outline-none"
    ]
  }
})

const { menu, popover, trigger } = menuStyles()





const Trigger = ({ className, ...props }) => (
  <Button className={trigger({ className })} {...props}>
    {(values) => (
      <>{typeof props.children === "function" ? props.children(values) : props.children}</>
    )}
  </Button>
)










const Content = ({
  className,
  showArrow = false,
  popoverClassName,
  ...props
}) => {
  const { respectScreen } = React.useContext(MenuContext)
  return (
    <Popover.Content
      respectScreen={respectScreen}
      showArrow={showArrow}
      className={popover({
        className: cn([
          showArrow && "placement-left:mt-[-0.38rem] placement-right:mt-[-0.38rem]",
          popoverClassName
        ])
      })}
      {...props}
    >
      <MenuPrimitive className={menu({ className })} {...props} />
    </Popover.Content>
  )
}







const Item = ({ className, isDanger = false, children, ...props }) => {
  const textValue = props.textValue || (typeof children === "string" ? children : undefined)
  return (
    <MenuItem
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          className
        })
      )}
      textValue={textValue}
      data-danger={isDanger ? "true" : undefined}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          {values.hasSubmenu && <IconChevronLgRight className="gpfw ml-auto size-3.5" />}
        </>
      )}
    </MenuItem>
  )
}





const MenuHeader = ({ className, separator = false, ...props }) => (
  <Header
    className={cn(
      "p-2 text-base font-semibold sm:text-sm",
      separator && "-mx-1 border-b px-3 pb-[0.625rem]",
      className
    )}
    {...props}
  />
)

const MenuSeparator = ({ className, ...props }) => (
  <Separator className={cn("-mx-1 my-1 h-px border-b", className)} {...props} />
)

const Checkbox = ({ className, children, ...props }) => (
  <Item className={cn("relative pr-8", className)} {...props}>
    {(values) => (
      <>
        {typeof children === "function" ? children(values) : children}
        {values.isSelected && (
          <span className="absolute right-2 flex size-4 shrink-0 items-center animate-in justify-center">
            <IconCheck />
          </span>
        )}
      </>
    )}
  </Item>
)

const Radio = ({ className, children, ...props }) => (
  <Item className={cn("relative", className)} {...props}>
    {(values) => (
      <>
        {typeof children === "function" ? children(values) : children}

        {values.isSelected && (
          <span
            data-slot="menu-radio"
            className="absolute right-3 flex items-center animate-in justify-center"
          >
            <IconBulletFill />
          </span>
        )}
      </>
    )}
  </Item>
)

const { section, header } = dropdownSectionStyles()





const Section = ({ className, ...props }) => {
  return (
    <MenuSection className={section({ className })} {...props}>
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSection>
  )
}

Menu.Primitive = MenuPrimitive
Menu.Content = Content
Menu.Header = MenuHeader
Menu.Item = Item
Menu.Content = Content
Menu.Keyboard = Keyboard
Menu.Checkbox = Checkbox
Menu.Radio = Radio
Menu.Section = Section
Menu.Separator = MenuSeparator
Menu.Trigger = Trigger
Menu.ItemDetails = DropdownItemDetails
Menu.Submenu = SubMenu

export { Menu, }
