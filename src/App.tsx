import CategoryForm from "./components/elements/category-form"
import { CategorySection } from "./components/elements/category-section"
import HeaderElement from "./components/elements/header-element"
import { SidebarProvider } from "./components/ui/sidebar"

function App() {
  return (
    <main className="w-full max-w-[80%] mx-auto">
      <HeaderElement />
      <SidebarProvider className="min-h-max">
        <CategorySection />
        <div className="flex items-center justify-center w-full">
          <CategoryForm />  
        </div>
      </SidebarProvider>
    </main>
  )
}

export default App
