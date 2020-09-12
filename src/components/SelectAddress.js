import React from 'react'

export default function SelectAddress({ addresses, addressId, handleSelect, reset, cat }) {
  let selectedAddress = null
  if (addressId) {
    selectedAddress = addresses.find(address => {
      return address.id === addressId
    })
  }
  return (
    <div>
      {selectedAddress ?
        <div className="option">
          <div className="leftPane">
            {selectedAddress.name}<br />
            {selectedAddress.address_line1}<br />
            {selectedAddress.address_city}, {selectedAddress.address_state} {selectedAddress.address_zip}<br />
            {selectedAddress.address_country}
          </div>
          <div className="rightPane" onClick={() => reset(cat)}>
            X
          </div>
        </div>
        :
        addresses.map((address) => {
          return (
            <div key={address.id} className="option wide clickable" onClick={() => handleSelect(address.id)}>
              <div className="leftPane">
                {address.name}<br />
                {address.address_line1}<br />
                {address.address_city}, {address.address_state} {address.address_zip}<br />
                {address.address_country}
              </div>
              <div className="rightPane">
                {address.id}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
