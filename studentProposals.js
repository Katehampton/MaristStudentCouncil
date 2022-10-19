const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
    <td>${doc.data().yrLevel}</td>
      <td>${doc.data().Proposals}</td>
      <td>${doc.data().change}</td>
      <td>
        <button class="btn btn-delete">Delete</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

//allows the user to delete a row in the table. 
//when it is successfully deleted there is an alert message aswell as a message in the console.
//When there is an error removing the proposal data, there is a console message and alert message. 
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('proposals').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
      alert("Document succesfully deleted!");
    }).catch(err => {
      console.log('Error removing document', err);
      alert("Error removing document");
    });
  });

}


db.collection('proposals').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})
