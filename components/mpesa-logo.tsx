import { Smartphone } from "lucide-react"

export default function MpesaLogo() {
  return (
    <div className="flex items-center">
      <div className="bg-green-600 text-white p-1 rounded-sm mr-1">
        <Smartphone className="h-4 w-4" />
      </div>
      <span className="font-bold text-green-600">M-PESA</span>
    </div>
  )
}
