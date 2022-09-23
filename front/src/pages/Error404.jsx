import React from 'react'
import { Link } from 'react-router-dom'
import { error404Traductions } from '../local/error404'
import { getLang } from '../utils/lang'

function Error404() {
  return (
    <div className='conError'>
        <h1 class="text-center ">404</h1>
        <div class="content_box_404">
            <h3 class="h2">
              {error404Traductions[getLang()].error}
            </h3>
        
            <Link to={'/class'} class="link_404">{error404Traductions[getLang()].help} </Link>
        </div>
    </div>
  )
}

export default Error404