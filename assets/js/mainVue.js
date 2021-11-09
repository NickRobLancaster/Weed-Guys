const app = Vue.createApp({
    data() {
        return {            
            //test data
            test_data_is_hidden: true,
            //test data
            
            shopping_cart: [],
            shopping_cart_is_hidden: true,
            shopping_cart_total: null,
            cart_total_items: null,

            //checkout node order
            checkout_order: [
                'Confirm Order',
                'Delivery Address',
                'Age Verification',
                'Complete Order'
            ],
            current_checkout_node: '',
            
            site_name: 'WeedGuys',
            
            menu: [
                //flower
                {type: 'Flower', name: 'Blue Dream', strain_type: 'Sativa', dominant: '', thc_content: 22, min_amount: 40, customer_gram_price: 10, image_url: './assets/img/', image_name: 'Blue_Dream.jpg', customer_selected_quantity: '0', cart_add_hidden: true},
                {type: 'Flower', name: 'Barney OG', strain_type: 'Indica', dominant: '', thc_content: 25, min_amount: 50, customer_gram_price: 15, image_url: './assets/img/', image_name: 'Barney_OG.jpg', customer_selected_quantity: '0', cart_add_hidden: true},
                {type: 'Flower', name: 'Train Wreck', strain_type: 'Hybrid', dominant: 'Indica', thc_content: 22, min_amount: 40, customer_gram_price: 10, image_url: './assets/img/', image_name: 'Train_Wreck.png', customer_selected_quantity: '0', cart_add_hidden: true},
                {type: 'Edibles', name: 'Sour Ropes', strain_type: 'Sativa', dominant: '', thc_content: 29, min_amount: 50, customer_gram_price: null, image_url: './assets/img/', image_name: 'Blue_Dream.jpg', customer_selected_quantity: '0', cart_add_hidden: true}
            ]
        };
    },
    mounted: function(){
        this.current_checkout_node = this.checkout_order[0];
    },
    watch: {
        current_checkout_node: function(val){
            if(val == "Confirm Order" || val == "Complete Order"){
                this.back_button_is_hidden = true;
                if(val == "Complete Order"){
                    this.shopping_cart = [];
                }
            } else {
                this.back_button_is_hidden = false;
            }

            if(val == "Complete Order"){
                //show confirmation
                //email user
                //email deliverer
                //post data to db
            }

            
        },
        shopping_cart: {
            handler(val, oldVal){
                this.shopping_cart_total = this.shopping_cart.reduce(function(tot, arr) { 
                    // return the sum with previous value
                    return tot + (arr.customer_gram_price * arr.customer_selected_quantity);
                
                    // set initial value as 0
                },0);
            },
            deep: true            
        }
        
    },
    computed: {
        testComputed() {
            
        }
    },
    methods: {
        reveal_add_to_cart(index){
            if(this.menu[index].cart_add_hidden != 0){
                this.menu[index].cart_add_hidden = false;
            } else {
                this.menu[index].cart_add_hidden = true;
            }
        },
        traverse_checkout_nodes(direction){
            var index = this.checkout_order.indexOf(this.current_checkout_node);

            if(direction == "next"){
                index += 1;
                if(index == ""){
                    //do nothing
                } else {
                    this.current_checkout_node = this.checkout_order[index];
                }
            }

            if(direction == "last"){
                index -= 1;
                if(index != 0 && index < 1){
                    //do nothing
                } else {
                    this.current_checkout_node = this.checkout_order[index];
                }
                
            }
        },
        delete_cart_item(index){
            this.shopping_cart.splice(index, 1);
        },
        toggle_test_data(){
            if(this.test_data_is_hidden == true){
                this.test_data_is_hidden = false;
            } else {
                this.test_data_is_hidden = true;
            }
            
        },
        toggle_shopping_cart(){
            if(this.shopping_cart_is_hidden == true){
                this.shopping_cart_is_hidden = false;
            } else {
                this.shopping_cart_is_hidden = true;
            }
            
        },
        add_item_to_cart(index){           
            if(this.menu[index].customer_selected_quantity == 0){
                alert("Please Select You Quantity");
                return;

            } else {
                this.shopping_cart_total = null;
            }
            var cart_item = {
                type: this.menu[index].type,
                name: this.menu[index].name,
                strain_type: this.menu[index].strain_type,
                dominant: this.menu[index].dominant,
                thc_content: this.menu[index].thc_content,
                customer_gram_price: this.menu[index].customer_gram_price,
                image_name: this.menu[index].image_name,
                customer_selected_quantity: this.menu[index].customer_selected_quantity
            };
            this.shopping_cart.push(cart_item);
            this.menu[index].customer_selected_quantity = 0;
            this.menu[index].cart_add_hidden = true;
        }
    }

});

app.mount('#appBody');