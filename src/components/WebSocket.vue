<!-- <template>
    <div class="content" id="websocket">
  <div>&nbsp;</div>
  <div class="row" >
    <div class="col">
      <button class="btn btn-sm btn-info" @click="connect">Create connection</button>
      <button class="btn btn-sm btn-success" @click="startTask">Start Task</button>
      <button class="btn btn-sm btn-danger" @click="stopTask">Stop Task</button>
      <button class="btn btn-sm btn-primary" @click="disconnect">Close connection</button>
    </div>
  </div>
  <div>&nbsp;</div>
  <div class="row">
    <div class="col">
      <ul class="list-group" style="height: 500px; overflow:scroll;">
        <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(m,idx) in messages" :key="'m-'+idx">
          {{m}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
var stompClient = null;
export default {
    
        el: "#websocket",
        data() {
            return{
            messages: []
            };
        },
        methods: {
            connect: function(){
                var socket = new SockJS('/connect');
                stompClient = Stomp.over(socket);
                var that = this;
                stompClient.connect({}, function(frame) {
 
                    that.handleMessageReceipt("Connected");
                    stompClient.subscribe('/topic/messages',
                        function(messageOutput) {
                        that.handleMessageReceipt(messageOutput.body);
                    });
                });
            },
            disconnect: function(){
                if(stompClient != null) {
                    stompClient.disconnect();
                }
                this.handleMessageReceipt("Disconnected");
            },
            startTask: function(){
                if ( stompClient != null ){
                    stompClient.send("/ws/start");
                }else{
                    alert("Please connect first");
                }
            },
            stopTask: function(){
                if ( stompClient != null ){
                    stompClient.send("/ws/stop");
                }else{
                    alert("Please connect first");
                }
            },
            handleMessageReceipt: function (messageOutput) {
                this.messages.push(messageOutput);
            }
        }
    };

</script>

<style>
</style> -->