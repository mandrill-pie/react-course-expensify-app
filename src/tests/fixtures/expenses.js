import moment from 'moment';

// baseline test data
export default [
	{
		id: 'u8jbo48fjsbg',
		description: 'Gum',
		note: '',
		amount: 2.76,
		createdAt: moment('20170912').valueOf()
	},
	{
		id: 'bs29w2fheg9',
		description: 'Mints',
		note: 'Some green mints',
		amount: 1.95,
		createdAt: moment('20170223').valueOf()
	},
	{
		id: '0f0gj3bouwouf',
		description: 'Rented car',
		note: 'From my trip to New Zeeland',
		amount: 143.16,
		createdAt: moment('20171001').add(4, 'days').valueOf()
	},
	{
		id: 'vcv28f0nr8fn',
		description: 'Gummy bears',
		note: 'A whole box',
		amount: 14.95,
		createdAt: moment('20171105').valueOf()
	}
];