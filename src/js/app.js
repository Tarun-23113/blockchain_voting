//import "../css/style.css"

const Web3 = require('web3');
const contract = require('@truffle/contract');

const votingArtifacts = require('../../build/contracts/Voting.json');
var VotingContract = contract(votingArtifacts)


window.App = {
  eventStart: async function() { 
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    VotingContract.setProvider(window.ethereum)
    
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];
    
    VotingContract.defaults({from: account, gas:6654755})

    // Load account data
    App.account = account;
    $("#accountAddress").html("Your Account: " + account);
    VotingContract.deployed().then(function(instance){
     instance.getCountCandidates().then(function(countCandidates){

            $(document).ready(function(){
              $('#addCandidate').click(async function() {
                  var nameCandidate = $('#name').val();
                  var partyCandidate = $('#party').val();
                  
                  if (!nameCandidate || !partyCandidate) {
                    alert('Please enter both candidate name and party');
                    return;
                  }
                  
                  try {
                    const result = await instance.addCandidate(nameCandidate, partyCandidate);
                    console.log('Candidate added:', result);
                    alert('Candidate added successfully!');
                    location.reload();
                  } catch(error) {
                    console.error('Error adding candidate:', error);
                    alert('Error adding candidate: ' + error.message);
                  }
            });   
              $('#addDate').click(async function(){             
                  var startDate = Date.parse(document.getElementById("startDate").value)/1000;
                  var endDate =  Date.parse(document.getElementById("endDate").value)/1000;
                  
                  if (!startDate || !endDate) {
                    alert('Please select both start and end dates');
                    return;
                  }
                  
                  try {
                    const result = await instance.setDates(startDate, endDate);
                    console.log("Dates set successfully:", result);
                    alert('Voting dates set successfully!');
                    location.reload();
                  } catch(error) {
                    console.error('Error setting dates:', error);
                    alert('Error setting dates: ' + error.message);
                  }
              });     

               instance.getDates().then(function(result){
                var startDate = new Date(result[0]*1000);
                var endDate = new Date(result[1]*1000);

                $("#dates").text( startDate.toDateString(("#DD#/#MM#/#YYYY#")) + " - " + endDate.toDateString("#DD#/#MM#/#YYYY#"));
              }).catch(function(err){ 
                console.error("ERROR! " + err.message)
              });           
          });
             
          for (var i = 0; i < countCandidates; i++ ){
            instance.getCandidate(i+1).then(function(data){
              var id = data[0];
              var name = data[1];
              var party = data[2];
              var voteCount = data[3];
              
              // Check if on admin page or voter page
              var isAdminPage = window.location.pathname.includes('admin');
              
              if (name && name.trim() !== '') {
                if (isAdminPage) {
                  // Admin view with delete button
                  var viewCandidates = `<tr>
                    <td>${name}</td>
                    <td>${party}</td>
                    <td>${voteCount}</td>
                    <td><button class="delete-btn" onclick="App.deleteCandidate(${id})" style="background-color: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Delete</button></td>
                  </tr>`;
                } else {
                  // Voter view with radio button
                  var viewCandidates = `<tr><td> <input class="form-check-input" type="radio" name="candidate" value="${id}" id=${id}>` + name + "</td><td>" + party + "</td><td>" + voteCount + "</td></tr>";
                }
                $("#boxCandidate").append(viewCandidates);
              }
            })
        }
        
        window.countCandidates = countCandidates 
      });

      instance.checkVote().then(function (voted) {
          console.log(voted);
          if(!voted)  {
            $("#voteButton").attr("disabled", false);

          }
      });

    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  },

  vote: function() {    
    var candidateID = $("input[name='candidate']:checked").val();
    if (!candidateID) {
      $("#msg").html("<p>Please vote for a candidate.</p>")
      return
    }
    VotingContract.deployed().then(function(instance){
      instance.vote(parseInt(candidateID)).then(function(result){
        $("#voteButton").attr("disabled", true);
        $("#msg").html("<p>Voted</p>");
         window.location.reload(1);
      })
    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  },

  deleteCandidate: async function(candidateId) {
    if (!confirm('Are you sure you want to delete this candidate?')) {
      return;
    }
    
    try {
      const instance = await VotingContract.deployed();
      await instance.deleteCandidate(candidateId);
      alert('Candidate deleted successfully!');
      window.location.reload();
    } catch(error) {
      console.error('Error deleting candidate:', error);
      alert('Error deleting candidate: ' + error.message);
    }
  }
}

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    console.warn("Using web3 detected from external source like Metamask")
    window.eth = new Web3(window.ethereum)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for deployment. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    window.eth = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
  }
  window.App.eventStart()
})
