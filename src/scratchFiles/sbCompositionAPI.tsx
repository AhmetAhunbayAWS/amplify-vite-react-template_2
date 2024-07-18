import EventCallbacks from '.'
import StorageBrowserElements from '.'

interface ProviderProps extends EventCallbacks {
    children?: React.ReactNode;
  }
  interface StorageBrowserProps extends EventCallbacks {}
  
  export interface StorageBrowser<T extends StorageBrowserElements> {
    (props: StorageBrowserProps): React.JSX.Element;
    
    /**
     * Top level React.Context `Provider` Component. Composed `StorageBrowser`
     * must be wrapped in `Provider`
     */
    Provider: (props: ProviderProps) => React.JSX.Element;
    
    /**
     * Composable High Level `View` Components
     */
    ListLocationsView: ListLocationsView<T>;
    LocationDetailView: LocationDetailView<T>;
    ActionView: ActionView<T>;
  }
  
  interface ViewComponent<T extends StorageBrowserElements, C> {
    (): React.JSX.Element;
    Controls: C;
    Table: TableControl<T>;
  }
  
  interface ListLocationsView<T extends StorageBrowserElements>
    extends ViewComponent<T, ListLocationsViewControls<T>> {}
  
  interface LocationDetailView<T extends StorageBrowserElements>
    extends ViewComponent<T, LocationDetailViewControls<T>> {}
  
  interface ActionView<T extends StorageBrowserElements>
    extends ViewComponent<T, ActionViewControls<T>> {
  }
  
  type CommonControl = 'Message' | 'Navigate' | 'Title';
  
  interface ListLocationsViewControls<T extends StorageBrowserElements>
    extends Pick<Controls<T>, CommonControl | 'Paginate' | 'Refresh'> {
    (): React.JSX.Element;
    Search: Omit<SearchControl<T>, 'Toggle'>;
  }
  
  interface LocationDetailViewControls<T extends StorageBrowserElements>
    extends Pick<
      Controls<T>,
      CommonControl | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
    > {
    (): React.JSX.Element;
  }
  
  interface ActionViewControls<T extends StorageBrowserElements>
    extends Pick<Controls<T>, CommonControl | 'Summary'> {
    (): React.JSX.Element;
  }
  
  export interface Controls<T extends StorageBrowserElements> {
    (): React.JSX.Element;
    ActionSelect: ActionSelectControl<T>;
    Message: MessageControl<T>;
    Refresh: RefreshControl<T>;
    Search: SearchControl<T>;
    Paginate: PaginateControl<T>;
    Navigate: NavigateControl<T>;
    Summary: SummaryControl<T>;
    Title: TitleControl<T>;
  }