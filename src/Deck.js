import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({
      deck: deck.data,
    });
  }
  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error('No Card Remaining');
      }
      let card = cardRes.data.cards[0];
      console.log(card);

      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          { code: card.code, image: card.image, name: `${card.value} of ${card.suit}` },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    let cards = this.state.drawn.map((c) => <Card image={c.image} name={c.name} key={c.code} />);
    return (
      <div>
        <button onClick={this.getCard}>Get Card!</button>
        {cards}
      </div>
    );
  }
}
export default Deck;
