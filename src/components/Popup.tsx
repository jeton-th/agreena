import React from 'react'
import '../style/index.css'

interface Props {
  width: number,
  popup: {
    x: number,
    y: number
    user: {
      userTypeIdentifier: string,
      company: {
        logoPath: string,
        name: string,
        description: string,
        agricultureTypes: Array<string>,
        productionTypes: Array<string>,
      },
    },
  }
}

const defaultProps = {
  width: 300,
  popup: null,
}

const Popup = ({ width, popup }: Props) => {
  let left = 0
  let bottom = 0
  let user

  if (popup) {
    left = popup.x - (width / 2)
    left = Math.max(0, left)
    left = Math.min(left, window.innerWidth - width)
    bottom = window.innerHeight - popup.y + 16
    bottom = Math.min(window.innerHeight - width, bottom)
    user = popup.user
  }

  return (
    <div
      className="popup"
      style={{
        width,
        left,
        bottom,
        display: popup ? 'block' : 'none',
      }}
    >
      {user && (
        <div>
          {user.company.logoPath && (
            <img src={user.company.logoPath} alt={`${user.company.name} logo`} />
          )}

          <h2>{user.company.name}</h2>
          <small className="type">
            {user.userTypeIdentifier.split('_').join(' ')}
          </small>

          <p>{user.company.description}</p>

          {user.company.agricultureTypes.length > 0 && (
            <>
              <div>
                <strong>Agriculture Types:</strong>
                <br />
                <small>{user.company.agricultureTypes.join(' | ')}</small>
              </div>
              <br />
            </>
          )}

          {user.company.productionTypes.length > 0 && (
            <>
              <div>
                <strong>Production Types:</strong>
                <br />
                <small>{user.company.productionTypes.join(' | ')}</small>
              </div>
              <br />
            </>
          )}

        </div>
      )}
    </div>
  )
}

Popup.defaultProps = defaultProps

export default Popup
