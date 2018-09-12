new Vue({
    el:"#app",
    data:{
        playerhealth:100,
        monsterhealth:100,
        gameisrunning:false,
        turns: []
    },
    methods:{
        startGame: function(){
            this.gameisrunning=true,
            this.playerhealth=100,
            this.monsterhealth=100,
            this.turns=[]
        },
        attack:function(){
            var damage=this.calculateDamage(10,3)
            this.monsterhealth-=damage; 
            this.turns.unshift({
                //isplayer=true,
                text:'player hits monoster for '+damage
            });
           if(this.checkwin()){
                return;
           }
           this.monosterattack();

        },
        heal:function(){
            if(this.playerhealth<=90){
                this.playerhealth+=10
            }else{
                this.playerhealth=100;
            }
            this.turns.unshift({
                //isplayer=true,
                text:'player heals for  10 '
            });
            this.monosterattack();

        },
        specialAttack: function(){
            var damage=this.calculateDamage(20,3)
            this.monsterhealth-=damage;
            this.turns.unshift({
               // isplayer=true,
                text:'player hits monoster hard  for '+damage
            });
            if(this.checkwin()){
                return;
            }
            this.monosterattack();

        },
        giveup:function(){
            this.gameisrunning=false;
            this.playerhealth=100;
            this.monsterhealth=100;

        },
        calculateDamage: function(max,min){
            return Math.max(Math.floor(Math.random()*max+1),min);
        },
        checkwin:function(){
            if(this.monsterhealth<=0)
            {
                if(confirm('you won! New Game?')){
                    this.startGame();
                }
                else{
                    this.gameisrunning=false;
                }
               
                this.gameisrunning=false;
                return true;
            }
            else if(this.playerhealth<=0)
            {
                if(confirm('you lost! New Game?')){
                    this.startGame();
                }
                else{
                    this.gameisrunning=false;
                }
                return true;
            }
            return false;

        },
        monosterattack:function(){
            var damage=this.calculateDamage(11,3)
            this.playerhealth-=damage;
            this.turns.unshift({
                //isplayer=false,
                text:'monoster hits player for '+damage
            });
            this.checkwin();

        }
        
    }
});