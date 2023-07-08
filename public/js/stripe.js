import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51NRVuASAzPhB0XvVcUN1z4Voqmbh7MuUCOEgUEds0yd3UmfrDgIXwlg4nKgBXKCuWrBj7iYYriNwmPN9hd0To9hW00Dx0gyl1o'
);

export const bookTour = async (tourID) => {
  try {
    // 1) get checkout session from the api
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`
    );
    console.log(session);

    // 2) create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
