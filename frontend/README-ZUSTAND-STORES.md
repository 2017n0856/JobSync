# Zustand Stores Implementation

This project now uses Zustand stores for global state management instead of local component state. This provides better data persistence, prevents unnecessary API calls, and enables powerful debugging with Redux DevTools.

## Available Stores

### 1. Auth Store (`useAuthStore`)
**File:** `src/store/authStore.ts`

Manages authentication state:
- User information
- Authentication token
- Login/logout actions
- Redirect URL management

**Usage:**
```tsx
import { useAuthStore } from '../store'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore()
  
  // Access user data
  console.log(user?.name)
  
  // Check authentication
  if (isAuthenticated) {
    // User is logged in
  }
}
```

### 2. Institute Store (`useInstituteStore`)
**File:** `src/store/instituteStore.ts`

Manages institute data:
- List of institutes
- Current institute details
- CRUD operations
- Pagination and filtering

**Usage:**
```tsx
import { useInstituteStore } from '../store'

function InstitutesPage() {
  const {
    institutes,
    isLoading,
    error,
    fetchInstitutes,
    updateInstitute,
    deleteInstitute
  } = useInstituteStore()
  
  // Fetch institutes (only if not already loaded)
  useEffect(() => {
    if (institutes.length === 0) {
      fetchInstitutes()
    }
  }, [])
  
  // Update an institute
  const handleUpdate = async (id: number, data: any) => {
    await updateInstitute(id, data)
  }
}
```

### 3. Client Store (`useClientStore`)
**File:** `src/store/clientStore.ts`

Manages client data with full CRUD operations.

### 4. Worker Store (`useWorkerStore`)
**File:** `src/store/workerStore.ts`

Manages worker data with full CRUD operations.

### 5. Task Store (`useTaskStore`)
**File:** `src/store/taskStore.ts`

Manages task data with full CRUD operations.

## Key Benefits

### 1. **Data Persistence**
- Data persists across page navigation
- No unnecessary API calls when returning to a page
- Better user experience with instant data loading

### 2. **Centralized State Management**
- All data in one place
- Easy to debug with Redux DevTools
- Consistent state across components

### 3. **Optimized API Calls**
- Smart fetching (only when needed)
- Automatic cache invalidation
- Optimistic updates

### 4. **Better Error Handling**
- Centralized error management
- Automatic error clearing
- Consistent error states

## Store Structure

Each store follows this pattern:

```tsx
interface StoreState {
  // Data
  items: Item[]
  currentItem: Item | null
  total: number
  page: number
  limit: number
  
  // Loading states
  isLoading: boolean
  isLoadingDetail: boolean
  
  // Error states
  error: string | null
  
  // Actions
  fetchItems: (filters?: Filters) => Promise<void>
  fetchItemById: (id: number) => Promise<void>
  createItem: (data: CreateData) => Promise<void>
  updateItem: (id: number, data: UpdateData) => Promise<void>
  deleteItem: (id: number) => Promise<void>
  clearError: () => void
  clearCurrentItem: () => void
}
```

## Best Practices

### 1. **Smart Data Fetching**
```tsx
// ✅ Good: Only fetch if not already loaded
useEffect(() => {
  if (institutes.length === 0) {
    fetchInstitutes()
  }
}, [])

// ❌ Bad: Always fetch on mount
useEffect(() => {
  fetchInstitutes()
}, [])
```

### 2. **Error Handling**
```tsx
// ✅ Good: Clear errors on unmount
useEffect(() => {
  return () => {
    clearError()
  }
}, [clearError])
```

### 3. **Optimistic Updates**
The stores automatically handle optimistic updates:
- Update local state immediately
- Sync with server
- Rollback on error

### 4. **Component Cleanup**
```tsx
// Clear current item when leaving detail pages
useEffect(() => {
  return () => {
    clearCurrentInstitute()
  }
}, [clearCurrentInstitute])
```

## Migration Guide

### From Local State to Zustand Store

**Before (Local State):**
```tsx
const [institutes, setInstitutes] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const fetchData = async () => {
  setLoading(true)
  try {
    const data = await api.getInstitutes()
    setInstitutes(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

**After (Zustand Store):**
```tsx
const { institutes, isLoading, error, fetchInstitutes } = useInstituteStore()

useEffect(() => {
  if (institutes.length === 0) {
    fetchInstitutes()
  }
}, [])
```

## Debugging with Redux DevTools

1. Install Redux DevTools Extension
2. Open browser DevTools
3. Look for "Redux" tab
4. You'll see all your Zustand stores:
   - `auth-store`
   - `institute-store`
   - `client-store`
   - `worker-store`
   - `task-store`

### Features Available:
- **State Inspection**: View current state
- **Action History**: See all dispatched actions
- **Time Travel**: Jump to any previous state
- **State Diff**: See what changed between actions
- **Export/Import**: Save and load state snapshots

## Performance Optimizations

### 1. **Selective Subscriptions**
```tsx
// ✅ Good: Only subscribe to what you need
const institutes = useInstituteStore(state => state.institutes)
const isLoading = useInstituteStore(state => state.isLoading)

// ❌ Bad: Subscribe to entire store
const store = useInstituteStore()
```

### 2. **Memoization**
```tsx
// Use React.memo for components that don't need frequent updates
const InstituteList = React.memo(({ institutes }) => {
  return institutes.map(institute => (
    <InstituteCard key={institute.id} institute={institute} />
  ))
})
```

### 3. **Batch Updates**
The stores automatically batch updates to prevent unnecessary re-renders.

## Troubleshooting

### Common Issues:

1. **Data not loading**: Check if the store is properly initialized
2. **Stale data**: Clear the store or force a refresh
3. **Memory leaks**: Always clear errors and current items on unmount
4. **Performance issues**: Use selective subscriptions

### Debug Commands:
```tsx
// Access store directly (for debugging)
const store = useInstituteStore.getState()
console.log(store.institutes)

// Force refresh
useInstituteStore.getState().fetchInstitutes()
```

## Future Enhancements

- **Persistent Storage**: Add localStorage persistence
- **Offline Support**: Cache data for offline access
- **Real-time Updates**: WebSocket integration
- **Advanced Caching**: Implement cache invalidation strategies 