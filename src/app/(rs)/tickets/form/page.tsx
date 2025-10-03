import { getCustomer } from "@/lib/queries/getCustomer"
import { BackButton } from "@/components/BackButton"
import { getTicket } from "@/lib/queries/getTicket"
import * as Sentry from "@sentry/nextjs"
import TicketForm from "./TicketForm"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Users, init as kindeInit } from "@kinde/management-api-js"



export async function generateMetadata({
   searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const {customerId, ticketId  } = searchParams
  if(!customerId && !ticketId){
    return {
      title: `Missing Ticket ID or Customer ID`,
      description: `Ticket ID or Customer ID is required to load ticket`,
    }
  }
  if(customerId && !ticketId){
    return {
      title: `New Ticket for Customer #${customerId}`,
      description: `Create a new ticket for Customer #${customerId}`,
    }
  }
  if(ticketId){
    return {
      title: `Edit Ticket #${ticketId}`,
      description: `Edit Ticket #${ticketId}`,
    }
  }
}

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  try {
    const { ticketId, customerId } = searchParams

    // Nothing provided
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID is required to load ticket
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      )
    }

    const { getPermission, getUser } = await getKindeServerSession()
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ])

    const isManager = managerPermission?.isGranted
    
    // Customer flow
    if (customerId) {
      const customer = await getCustomer(Number(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not active.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      // return ticket form
      if(isManager) {
        kindeInit()
        const {users} = await Users.getUsers()
        const techs = users ? users.map(user => ({
          id:user.email!,
          description : user.email!
        })) : []

        return <TicketForm customer={customer} techs={techs} />;
      }else{
        return <TicketForm customer={customer} />;
        }
        
    }

    // edit ticket flow
    if (ticketId) {
      const ticket = await getTicket(Number(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      const customer = await getCustomer(ticket.customerId)

      if(isManager) {
        kindeInit()
        const {users} = await Users.getUsers()
        const techs = users ? users.map(user => ({
          id:user.email!,
          description : user.email!
        })) : []

        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      }else{
        const isEditable = user?.email?.toLowerCase() === ticket.tech.toLowerCase()
        return <TicketForm customer={customer} ticket={ticket}
        isEditable={isEditable} />;
        }

    }
  } catch (e) {
    if (e instanceof Error) {
        Sentry.captureException(e)
      throw e
    }
  }

  return null
}
