import getTicket from './methods/getTicket';
import removeTicketWidget from './methods/removeTicketWidget';
import addTicketWidget from './methods/addTicketWidget';
import editTicketWidget from './methods/editTicketWidget';
import changeTicketStatus from './methods/changeTicketStatus';
import showTicketDescription from './methods/showTicketDescription';

const serverUrl = 'https://gordov-andrey.herokuapp.com/';

const mainContainer = document.querySelector('.container');
const ticketsContainer = document.querySelector('.tickets-container');
const addTicketButton = document.querySelector('.add-ticket-button');

document.addEventListener('DOMContentLoaded', () => {
  const xhrLoadTickets = new XMLHttpRequest();
  xhrLoadTickets.open('GET', `${serverUrl}/?method=allTickets`);
  xhrLoadTickets.responseType = 'json';
  xhrLoadTickets.addEventListener('load', () => {
    if (xhrLoadTickets.status >= 200 && xhrLoadTickets.status < 300) {
      try {
        const responsedTickets = xhrLoadTickets.response;
        if (!responsedTickets.length) return;
        responsedTickets.forEach((item) => {
          getTicket(item, ticketsContainer);

          const currentTicket = ticketsContainer.lastElementChild;
          const ticketStatus = currentTicket.querySelector('.ticket-status');
          const ticketStatusCheckbox = ticketStatus.querySelector('.ticket-status-checkbox');
          if (ticketStatus.dataset.status === 'true') {
            ticketStatusCheckbox.classList.remove('hidden');
          }
          const ticketName = currentTicket.querySelector('.ticket-name');
          const ticketEdit = currentTicket.querySelector('.ticket-edit-button');
          const ticketRemove = currentTicket.querySelector('.ticket-remove-button');

          ticketStatus.addEventListener('click', () => {
            changeTicketStatus(
              mainContainer,
              currentTicket,
              ticketStatus,
              ticketStatusCheckbox,
              serverUrl,
            );
          });

          ticketName.addEventListener('click', () => {
            showTicketDescription(
              mainContainer,
              currentTicket,
              ticketName,
              serverUrl,
            );
          });

          ticketEdit.addEventListener('click', () => {
            editTicketWidget(mainContainer, currentTicket, ticketEdit, serverUrl);
          });

          ticketRemove.addEventListener('click', () => {
            removeTicketWidget(mainContainer, currentTicket, serverUrl);
          });
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhrLoadTickets.send();

  addTicketButton.addEventListener('click', () => {
    addTicketWidget(mainContainer, serverUrl);
  });
});
