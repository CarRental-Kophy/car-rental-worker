const { errorMessage, getError } = require("../../core/utils")
const { searchUrl, axios, fullURL, requestHeaders } = require("../../core/worker.core")

const searchCar = (data) => async res =>{
    try {
        let response = await axios.post(fullURL, data, {headers: { 
            'Content-Type': 'application/json', 
            'Cookie': 'PL_CINFO=ba70e5950af584e7916e53eee709b79c~1674738591~v2; SITESERVER=ID=ba70e5950af584e7916e53eee709b79c; _pxhd=wMrLJ056XP73OX49kN2AjWMIS4Dssj49B1/kI7W12Xsw8jb2O5gdOaXZrJHm3t/SgCL78HpNXxGyXfUOfgbGGg==:iYC3BWEVpYTLZ9tAI4bmlUIOIlVebRpUpjoK0PcEC8/XqoQ0gicKn4XJk1Eky4K6-4ZvuR3YwaREfGTqpvA8SLSkds1kAogl7xiyw1Ct5Mo='
          },})
        return response.data
    } catch (error) {
        let err = getError(error)
        return errorMessage(err.status, err.message, err.data)(res)
    }
}

module.exports = {searchCar}