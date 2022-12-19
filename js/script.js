// * ABIENTE DI SVILUPPO LUXON
const DateTime = luxon.DateTime;




// * ABIENTE DI SVILUPPO VUE
const {createApp} = Vue;

createApp({
    data() {
        return {
            contacts: [
                {
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
                },

                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            activeContactIndex : 0,
            newMessage : '',
            contactMessagePresence : false,
            controlContactsValue:'',
            activeMessageIndex : -1,
            contactHiddenOptionsPresence: false,
            contactLocked : false,
        }
    },



    methods: {
        // * FUNZIONI GENERICI E RIUTILIZZABILI
        addElementToTheList(list,newElementText,elementStatus){
            newElementText = newElementText.toLowerCase();
            let elementDate = DateTime.now().toFormat('dd/MM/yyyy hh:mm:S').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            if(newElementText !=''){
                const newElement = {
                    date: elementDate,
                    message: newElementText,
                    status: elementStatus,
                }
    
                list.push(newElement);
            }
        },

        eliminateList(list){
            list.length=0;
        },

        eliminateElementOfList(list , indexOfElementOfList){
            list.splice(indexOfElementOfList,1);
        },

        obtainAValidTime(element){
            let time = DateTime.fromFormat(element,'dd/MM/yyyy hh:mm:S').toLocaleString(DateTime.TIME_SIMPLE);

            return time;
        },



        // * FUNZIONI SPECIFICHE
        receiveMessage(listOfMessages,newContactMessage,messageStatus){
            setTimeout(this.addElementToTheList,1000,listOfMessages,newContactMessage,messageStatus); 
        },

        refreshInputField(){
            this.newMessage = '';
        },

        updateIndex(index){
            this.activeContactIndex = index;
        },

        controlPresenceInList(value){
            if((/[a-zA-Z]/).test(value)){
                this.contacts.forEach(contact => {
                    if(!contact.name.toLowerCase().includes(value)) contact.visible = false;
    
                    else contact.visible = true;
                })
            }
        },

        findTheFirstVisibleContact(){
            const visibleContacts = this.contacts.filter(contact => contact.visible);
            const firstVisibleContact = visibleContacts[0];
            const firstVisibleContactIndex = this.contacts.indexOf(firstVisibleContact);
            this.updateIndex(firstVisibleContactIndex);
        },

        seeAllContacts(value){
            this.contacts.forEach(contact => {
                if(value === '') contact.visible = true;
            })
        },

        showMessagesHiddenOptions(messagIindex){
            this.activeMessageIndex = messagIindex;
        },

        hideMessagesOptions(){
            this.activeMessageIndex = -1;
        },

        deleteMessage(messageIndex){
            this.contacts[this.activeContactIndex].messages.splice(messageIndex,1);
            this.hideMessagesOptions();
        },

        showContactHiddenOptions(){
            this.contactHiddenOptionsPresence = !this.contactHiddenOptionsPresence
        },

        lockAContact(){
            this.contactLocked = true;
        },

        unlockAContact(){
            this.contactLocked = false;
        },
    },
}).mount('#app')