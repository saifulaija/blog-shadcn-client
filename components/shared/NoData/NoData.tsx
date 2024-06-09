import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

// Enhanced NoData component
interface NoDataProps {
    message?: string
    description?: string
    buttonText?: string
    onButtonClick?: () => void
  }
  
  export function NoData({
    message = "No Data Available",
    description = "There is no data to display at the moment.",
    buttonText = "Reload",
    onButtonClick = () => window.location.reload()
  }: NoDataProps) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
        <p className="text-gray-500 mb-4">{description}</p>
        <Button variant="outline" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    )
  }
  