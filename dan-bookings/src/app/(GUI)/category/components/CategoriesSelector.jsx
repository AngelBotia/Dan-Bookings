import '../category.style.css'

export const CategoriesSelector = ({categories = [],indexSelect = 0,onClick=()=>{}}) => {
  return (
    categories.length ?
    <aside className='navigation-bar'>
        <ul>
            {
             categories?.map((category,index) => {
                    const dataToPrint = index == indexSelect ? '✅' : '❌'
                    return(
                          <li key={index} className='navigation-item' onClick={()=>onClick(category,index)} >{dataToPrint}</li> 
                    )
                }) 
            }
        </ul>
    </aside>
    : null
    
  )
}
