import { useRenderer } from "@opentui/solid"
import { createSimpleContext } from "./helper"

export const { use: useSuspend, provider: SuspendProvider } = createSimpleContext({
  name: "Suspend",
  init: (input: { onSuspend?: () => Promise<void> }) => {
    const renderer = useRenderer()
    return async () => {
      renderer.suspend()
      renderer.currentRenderBuffer.clear()

      await input.onSuspend?.()
      process.kill(process.pid, "SIGTSTP")
    }
  },
})
