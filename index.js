let searchInput = document.querySelector('.serchInput')
let userContainer = document.getElementById('customers')
let loadingSpan = document.querySelector('.loading')
searchInput.addEventListener('input', serch)

async function call(value) {
   loadingSpan.style.display = 'block'
   let data = await fetch('https://5dc588200bbd050014fb8ae1.mockapi.io/assessment')
   let result = await data.json()

   result.map(e => {
      let index = e.createdAt.indexOf("T")
      e.createdAt = e.createdAt.slice(0, index)
   })

   // result = result.filter(e => e.name.toLowerCase().startsWith(value.toLowerCase()))
   result = result.filter(e => e.name.toLowerCase().includes(value.toLowerCase()))

   userContainer.innerHTML = `
      <tr>
         <th>Name</th>
         <th class="hidden">ID</th>
         <th class="hidden">Created</th>
      </tr> `

   if (!result.length) {
      createHtml([{ name: 'We can\'t find anything' }])
   }
   loadingSpan.style.display = 'none'
   createHtml(result)
}

function createHtml(data) {
   var rawTemplate = document.getElementById('userTemplate').innerHTML
   var compiledTemplate = Handlebars.compile(rawTemplate)
   var ourGeneratedHTML = compiledTemplate(data)

   userContainer.innerHTML += ourGeneratedHTML
}

function removeClass() {
   let hiddens = document.querySelectorAll('.hidden')

   hiddens.forEach(e => {
      e.classList.remove('hidden')
   })
}

function serch(e) {
   if (e) {
      call(e.target.value.trim())
   }
}

call('')