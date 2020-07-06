import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    methods: {
        createContact() {
            const {...contact} = this.form;
            console.log(contact);
            this.contacts.push({...contact, id: Date.now()});

            this.form.name = this.form.value = '';
        },
        markContact(id) { console.log(id); },
        removeContact(id) {
            this.contacts = this.contacts.filter(c => c.id !== id);
            console.log(id);
            },
    }
});