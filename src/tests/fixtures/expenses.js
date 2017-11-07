import moment from 'moment';

// baseline test data
export default [
	{
		id: 1,
		description: 'Gum',
		note: '',
		amount: 2.76,
		createdAt: moment('20170912').valueOf()
	},
	{
		id: 2,
		description: 'Mints',
		note: 'Some green mints',
		amount: 1.95,
		createdAt: moment('20170223').valueOf()
	},
	{
		id: 3,
		description: 'Rented car',
		note: 'From my trip to New Zeeland',
		amount: 143.16,
		createdAt: moment('20171001').add(4, 'days').valueOf()
	},
	{
		id: 4,
		description: 'Gummy bears',
		note: 'A whole box',
		amount: 14.95,
		createdAt: moment('20171105').valueOf()
	}
];