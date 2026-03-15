import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty"
import AuthDialog from "@/components/AuthDialog"

const UserNotAuthenticated = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img src="not-authorized.png" alt="Empty cart" className="size-20" />
        </EmptyMedia>

        <EmptyTitle>Please login to view your cart</EmptyTitle>

        <EmptyDescription>
          You need to be logged in to see the items in your shopping cart. Login
          to continue shopping and manage your cart.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <AuthDialog />
      </EmptyContent>
    </Empty>
  )
}
export default UserNotAuthenticated
