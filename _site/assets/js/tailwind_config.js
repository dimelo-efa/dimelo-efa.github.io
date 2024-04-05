tailwind.config = {
    theme: {
        fontFamily: {
            'parisienne': ['Parisienne', 'cursive'],
            'libre-baskerville': ['"Libre Baskerville"', 'serif'],
            'gloock': ['Gloock', 'serif'],
            'spectral-sc': ['"Spectral SC"', 'serif'],
            'rozha-one': ['"Rozha One"', 'serif'],
        },
        extend: {
            colors: {
                'maximum-red': '#da2922',
                'liberty': '#50569e'
            },
            backgroundImage: {
                'hero': "url('/assets/images/alt_hero_background.png')",
                'contact': "url('/assets/images/contact_background.png')"
            }
        },
    }
}