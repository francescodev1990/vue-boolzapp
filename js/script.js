const {
    createApp
} = Vue

createApp({
    data() {
        return {
            chat_active: 0,
            new_message: '',
            name_filter: '',
            user: {
                name: 'Sofia',
                avatar: '_io'
            },
            contacts: [
                {
                    id: 0,
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 1,
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 3,
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 4,
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 5,
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                }
            ]
        }
    },
    computed: {
        searchChat() {
            let filteredChat;
            if (this.name_filter != '') {
                for (let i = 0; i < this.contacts.length; i++) {
                    if (this.contacts[i].name.toLowerCase().includes(this.name_filter)) {
                        this.contacts[i].visible = true
                    }
                    else {
                        this.contacts[i].visible = false
                    }
                }
                filteredChat = this.contacts;
            }
            else {
                for (let i = 0; i < this.contacts.length; i++) {
                    this.contacts[i].visible = true
                }
                filteredChat = this.contacts;
            }
            return filteredChat;
        }

    },
    methods: {
        splitDate(date) {
            //divido la stringa con lo spazio, prendo il secondo elemento dell'array e prendo le prima 5 lettere
            let new_date = date.split(' ')[1].substring(0, 5);
            return new_date;
        },
        changeChat(index) {
            this.chat_active = index
        },
        sendNewMessage() {
            let new_date = this.generateNewDate();

            let object = {
                date: new_date,
                message: this.new_message,
                status: 'sent'
            };

            this.contacts[this.chat_active].messages.push(object);
            this.new_message = '';

            setTimeout(() => {
                let new_date = this.generateNewDate();

                let object = {
                    date: new_date,
                    message: 'ok',
                    status: 'received'
                }

                this.contacts[this.chat_active].messages.push(object);

            }, 1000)
        },
        hourLastMessageSent(index) {
            let messages = this.contacts[index].messages;
            let filter_messages = messages.filter((elem) => {
                return elem.status.includes('sent');
            })
            let date = this.splitDate(filter_messages[filter_messages.length - 1].date);
            return date;
        },
        hourLastMessage(index) {
            let messages = this.contacts[index].messages;
            let hour_last_message = this.splitDate(messages[messages.length - 1].date);
            return hour_last_message;
        },
        lastMessage(index) {
            let messages = this.contacts[index].messages;
            let last_message = messages[messages.length - 1].message;
            if (last_message.length > 25) {
                last_message = last_message.substring(0, 25) + '...'
            }
            else {
                return last_message
            }
            return last_message;

        },
        generateNewDate() {
            let today = new Date();
            let new_date = today.getDate() + '/' +
                (today.getMonth() + 1) + '/' +
                today.getFullYear() + ' ' +
                today.getHours() + ':' +
                ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes()) + ':' +
                ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds());

            return new_date;
        }
    },
}).mount('#app')