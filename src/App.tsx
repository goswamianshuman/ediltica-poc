import { CategorySection } from "./components/elements/category-section"
import HeaderElement from "./components/elements/header-element"
import { SidebarProvider } from "./components/ui/sidebar"

function App() {
  return (
    <main className="w-full max-w-[80%] mx-auto">
      <HeaderElement />
      <SidebarProvider className="min-h-max space-x-4">
        <CategorySection />
        <div className="flex mt-4 flex-col items-center justify-center w-full min-h-[80vh] bg-sidebar rounded-md">
          <img className="h-96 w-96" src="home.svg" />
          <p className="text-muted-foreground">Edulica search category poc..</p>
        </div>
      </SidebarProvider>
    </main>
  )
}

export default App
