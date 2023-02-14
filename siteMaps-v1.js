var map = L.map('map').setView([-1.192, 119.62], 6);

L.tileLayer.provider('MapBox', {
    id:'mapbox/streets-v12',
    accessToken: 'pk.eyJ1IjoibmRhd2luYXRhOTYiLCJhIjoiY2xkZjI2M3h5MDE2MzQwbWl1azQ4bHU2MiJ9.MIsz5WLdvtStrD83-L4ajA'
}).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// map.locate({setView: true, maxZoom: 6});
// $(".leaflet-popup-content-wrapper, .leaflet-popup.tip").css({"min-width":'1000px'});

$('.leaflet-control-attribution').hide()


axios.get('/getfull')
    .then((c)=>{
        let dat = c.data

        dat.map((c)=>{
            let clr = '#50577A'
            if(c.status=='ON'){clr='#367E18'}
            else if (c.status=='ON Perlu Penanganan'){clr='#F57328'}
            else if (c.status=='OFF Perlu Penanganan'){clr='#CC3636'}
        
            let clr1 = '#50577A'
            if(c.Status_tele=='ON'){clr1='#367E18'}
            else if (c.Status_tele=='GAP'){clr1='#F57328'}
            else if (c.Status_tele=='OFF'){clr1='#CC3636'}
        
            let statuSPM = c.status == null ? 'Tidak Ada' : c.status
        
            let markerHtmlStyles = `
                background-color: ${clr1};
                width: 1.8rem;
                height: 1.8rem;
                display: block;
                left: -1.5rem;
                top: -1.5rem;
                position: relative;
                border-radius: 3rem 3rem 0;
                transform: rotate(45deg);
                border: 2px solid #FFFFFF`
            
            let myIcon = L.divIcon({
                    className: "my-div-icon",
                    iconAnchor: [0, 24],
                    labelAnchor: [-6, 0],
                    popupAnchor: [0, -36],
                    html: `<span style="${markerHtmlStyles}" />`
                })
        
            d = c.dTime ? c.dTime.split("T")[0] : "Tidak Ada"
            
            L.marker([c.Lat, c.Long], {icon: myIcon}).addTo(map).bindPopup(`
            <div class="tb">
                <div class="fw-bold kode" style="background-color:${clr1};" >${c.kode}</div>
                <div style="margin:10px">
                    <table class="tbl">
                        <tr>
                            <td class="fw-bold">Nama</td>
                            <td class="fw-bold ">:</td>
                            <td>${c.Nama}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Tipe</td>
                            <td class="fw-bold ">:</td>
                            <td>${c.Tipe}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Rekom</td>
                            <td class="fw-bold ">:</td>
                            <td>${c.rekom}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Kerusakan</td>
                            <td class="fw-bold ">:</td>
                            <td>${c.kerusakan}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Status Site</td>
                            <td class="fw-bold ">:</td>
                            <td><div style="color: white; background-color:${clr1}; border-radius:10px;  text-align: center;" >${c.Status_tele}</div></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Status PM</td>
                            <td class="fw-bold ">:</td>
                            <td><div style="color: white; background-color:${clr}; border-radius:10px;  text-align: center;" >${statuSPM}</div></td>
                        </tr>
                        
                        </table>
                        <div style="color:blue; margin-top:10px">Last PM ${d}</div>
                </div>
            </div>
            `)
        })
        
    })

// dat = JSON.parse(data)

