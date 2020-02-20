import * as React from "react"

// React context allows state to be shared between components. 
//   It works really well with compound components. 
//   We are going to use it in our Tabs and Tab components to share state between them
interface ITabsContext {
    activeName?: string
    handleTabClick?: (name: string, content: React.ReactNode) => void
}

// We've used the createContext function in React to create our context.
const TabsContext = React.createContext<ITabsContext>({})

interface IState {
    activeHeading: string
    activeContent: React.ReactNode
}

interface ITabProps {
    name: string
    initialActive?: boolean
    heading: () => string | JSX.Element
}

class Tabs extends React.Component<{}, IState> {
    // we must remember we don't have access to any Tabs instance members (for instance, `this`).
    //   However, we can reference Tab in JSX using Tabs.Tab .
    // The children property is a special property that React gives a component that contains the component's child nodes. 
    public static Tab: React.SFC<ITabProps> = props => (
        // The child for Consumer needs to be a function that has a parameter for the context value and returns some JSX.
        //   Consumer will then render the JSX we return.
        <TabsContext.Consumer>
            {(context: ITabsContext) => {
                // Whin first lendering, There is no activeName, so that render initial value(Node).
                if (!context.activeName && props.initialActive) {
                    if(context.handleTabClick) {
                        context.handleTabClick(props.name, props.children)
                        return null
                    }
                }
                const activeName = context.activeName ? context.activeName : props.initialActive ? props.name : ""
                const handleTabClick = (e: React.MouseEvent<HTMLElement>) => {
                    if (context.handleTabClick) context.handleTabClick(props.name, props.children)
                }

                return (
                    <li
                        onClick={handleTabClick}
                        // Compare props.name with context(active) name to add className.
                        className={props.name === activeName ? "active" : ""}>
                        {props.heading()}
                    </li>
                )
            }
            }
        </TabsContext.Consumer>
    )
    // private existHeading = (): boolean => (this.props.headings && this.props.headings.length > 0)
    private handleTabClick = (name: string, content: React.ReactNode) => {
        this.setState({ activeHeading: name, activeContent: content })
    }
    public render() {
        return (
            <TabsContext.Provider
                value={{
                    activeName: this.state ? this.state.activeHeading : "",
                    handleTabClick: this.handleTabClick
                }}>
                {/* The render method in the Tabs class is simply going to render its child nodes. */}
                <ul className="tabs">{this.props.children}</ul>
                <div>{this.state && this.state.activeContent}</div>
            </TabsContext.Provider>
        )
    }
}

export default Tabs