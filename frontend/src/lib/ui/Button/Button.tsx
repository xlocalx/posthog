// Button.tsx
import React, {
    createContext,
    useContext,
    useState,
    forwardRef,
    ElementType,
    ReactNode,
    ComponentPropsWithoutRef,
    Ref,
    KeyboardEvent,
  } from 'react';
  
  /* -------------------------------------------------------------------------- */
  /*                           Polymorphic Type Helpers                         */
  /* -------------------------------------------------------------------------- */
  
  type PolymorphicRef<E extends ElementType> = Ref<React.ElementRef<E>>;
  
  /**
   * PolymorphicComponentProps
   * - E extends ElementType: The HTML element or React component to render.
   * - P: Additional props specific to our custom component logic.
   */
  type PolymorphicComponentProps<E extends ElementType, P> = P &
    Omit<ComponentPropsWithoutRef<E>, keyof P> & {
      as?: E;
      children?: ReactNode;
      ref?: PolymorphicRef<E>;
    };
  
  /* -------------------------------------------------------------------------- */
  /*                           Button Context & Hook                            */
  /* -------------------------------------------------------------------------- */
  
  interface ButtonContextValue {
    isPressed: boolean;
    setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const ButtonContext = createContext<ButtonContextValue | null>(null);
  
  function useButtonContext() {
    const context = useContext(ButtonContext);
    if (!context) {
      throw new Error('Button compound components must be used within <Button.Root>.');
    }
    return context;
  }
  
  /* -------------------------------------------------------------------------- */
  /*                              Button.Root                                   */
  /* -------------------------------------------------------------------------- */
  
  export interface ButtonRootProps {
    // You can add your own custom props here, for instance "disabled?: boolean;"
    // We'll demonstrate a simple onClick approach
    onClick?: React.MouseEventHandler;
  }
  
  function ButtonRootComponent<E extends ElementType = 'button'>(
    {
      as,
      onClick,
      children,
      ...props
    }: PolymorphicComponentProps<E, ButtonRootProps>,
    forwardedRef: PolymorphicRef<E>
  ) {
    const [isPressed, setIsPressed] = useState(false);
    const Component = as || 'button';
  
    // Detect if the underlying element is actually a native <button>
    const isNativeButton = Component === 'button';
  
    // Optional: If rendering something else (like <div>), we add "button-like" accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Only trigger if the key event happened on the parent (currentTarget),
        // not a nested child.
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
    };
  
    // If not a native button, add role="button", tabIndex=0, and handle keyboard activation
    const a11yProps = !isNativeButton
      ? {
          role: 'button',
          tabIndex: 0,
          onKeyDown: handleKeyDown,
        }
      : {};
  
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
  
    const contextValue = {
      isPressed,
      setIsPressed,
    };
  
    return (
      <ButtonContext.Provider value={contextValue}>
        <Component
          ref={forwardedRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={onClick}
          {...a11yProps}
          {...props}
        >
          {children}
        </Component>
      </ButtonContext.Provider>
    );
  }
  
  /**
   * Wrap in forwardRef and type-assert so we can preserve the polymorphic signature.
   */
  const ButtonRoot = forwardRef(ButtonRootComponent) as <E extends ElementType = 'button'>(
    props: PolymorphicComponentProps<E, ButtonRootProps>
  ) => JSX.Element;
  
  /* -------------------------------------------------------------------------- */
  /*                              Button.Icon                                   */
  /* -------------------------------------------------------------------------- */
  
  interface ButtonIconProps {
    // Add any extra icon-specific props if needed
  }
  
  function ButtonIconComponent<E extends ElementType = 'span'>(
    { as, children, ...props }: PolymorphicComponentProps<E, ButtonIconProps>,
    forwardedRef: PolymorphicRef<E>
  ) {
    const { isPressed } = useButtonContext();
    const Component = as || 'span';
  
    // Example styling: scale icon if button is pressed
    const style = {
      display: 'inline-block',
      transform: isPressed ? 'scale(0.95)' : 'scale(1)',
      marginRight: '0.4rem',
    };
  
    return (
      <Component ref={forwardedRef} style={style} {...props}>
        {children}
      </Component>
    );
  }
  
  const ButtonIcon = forwardRef(ButtonIconComponent) as <E extends ElementType = 'span'>(
    props: PolymorphicComponentProps<E, ButtonIconProps>
  ) => JSX.Element;
  
  /* -------------------------------------------------------------------------- */
  /*                              Button.Label                                  */
  /* -------------------------------------------------------------------------- */
  
  interface ButtonLabelProps {
    // Add any extra label-specific props if needed
  }
  
  function ButtonLabelComponent<E extends ElementType = 'span'>(
    { as, children, ...props }: PolymorphicComponentProps<E, ButtonLabelProps>,
    forwardedRef: PolymorphicRef<E>
  ) {
    const { isPressed } = useButtonContext();
    const Component = as || 'span';
  
    // Example styling: bolder text if button is pressed
    const style = {
      fontWeight: isPressed ? 'bold' : 'normal',
    };
  
    return (
      <Component ref={forwardedRef} style={style} {...props}>
        {children}
      </Component>
    );
  }
  
  const ButtonLabel = forwardRef(ButtonLabelComponent) as <E extends ElementType = 'span'>(
    props: PolymorphicComponentProps<E, ButtonLabelProps>
  ) => JSX.Element;
  
  /* -------------------------------------------------------------------------- */
  /*                             Export as Button                               */
  /* -------------------------------------------------------------------------- */
  
  export const Button = {
    Root: ButtonRoot,
    Icon: ButtonIcon,
    Label: ButtonLabel,
  };
  
  /* -------------------------------------------------------------------------- */
  /*                              Example Usage                                 */
  /* -------------------------------------------------------------------------- */
  
  // USAGE EXAMPLE (uncomment to try in the same file or copy into your App.tsx):
  
  /*
  function Example() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Polymorphic Button Demo</h1>
  
        <Button.Root onClick={() => alert('Clicked default <button>!')}>
          <Button.Icon>🔍</Button.Icon>
          <Button.Label>Search</Button.Label>
        </Button.Root>
  
        <br /><br />
  
        <Button.Root as="div" onClick={() => alert('Clicked <div> button-like!')}>
          <Button.Icon>💾</Button.Icon>
          <Button.Label>Save (as div)</Button.Label>
        </Button.Root>
      </div>
    );
  }
  
  export default Example;
  */
  