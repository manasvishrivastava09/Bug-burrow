import './App.css';
import './styles.css';
import { useReducer } from 'react';
import TicketForm from './components/TicketForms';
import ticketReducer from './reducers/ticketReducer';
import TicketList from './components/TicketList';
import { sortTickets } from './utilities/sortingUtilites';

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: 'High to Low',
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  return (
    <div className="App">
      <img src="HeroImg.jpg" alt="Bug Burrow" className='heroImg'></img>
      <p className="headline">
        <strong>Bug Burrow - Time to make task management easy!</strong>
      </p>
      <div className="container">
        <h1>Enter Task Details</h1>

        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>

        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>

            <select
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: 'SET_SORTING', payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>

            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;