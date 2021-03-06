const initialState = {
    menu: [
        [{
            label: 'Job',
            href: '/job',
            icon: 'book'
        },{
            label: 'Event',
            href: '/event',
            icon: 'book'
        },{
            label: 'Article',
            href: '/blog',
            icon: 'book'
        },{
            label: 'Apply',
            href: '/apply',
            icon: 'book'
        }],
        [{
            label: 'Profile',
            href: '/profile',
            icon: 'user'
        }, {
            label: 'Logout',
            href: '/logout',
            icon: 'log-out'
        }]
    ]
};
export default function layout(state = initialState, action = {}) {
    switch (action.type) {
        default: return state;
    }
}
