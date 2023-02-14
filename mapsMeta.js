var map = L.map('map').setView([-1.192, 119.62], 6);
// add Stamen Watercolor to map.
// L.tileLayer.provider('Stamen.Watercolor').addTo(map);
L.tileLayer.provider('MapBox', {
    id:'mapbox/streets-v12',
    accessToken: 'pk.eyJ1IjoibmRhd2luYXRhOTYiLCJhIjoiY2xkZjI2M3h5MDE2MzQwbWl1azQ4bHU2MiJ9.MIsz5WLdvtStrD83-L4ajA'
}).addTo(map);
// map.locate({setView: true, maxZoom: 6});
datt = JSON.parse(data)

$('.leaflet-control-attribution').hide()

if(datt.length>0){
    dat = datt[0]
    // L.map('map').setView([dat.Lat, dat.Long], 11);
    map.setView([dat.Lat, dat.Long], 12);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);

    let clr = '#50577A'
    if(dat.Status_tele=='ON'){clr='#367E18'}
    else if (dat.Status_tele=='GAP'){clr='#F57328'}
    else if (dat.Status_tele=='OFF'){clr='#CC3636'}

    let clr1 = '#50577A'
    if(dat.status=='ON'){clr1='#367E18'}
    else if (dat.status=='ON Perlu Penanganan'){clr1='#F57328'}
    else if (dat.status=='OFF Perlu Penanganan'){clr1='#CC3636'}

    let statuSPM = dat.status == null ? 'Tidak Ada' : dat.status

    let markerHtmlStyles = `
            background-color: ${clr};
            width: 2.5rem;
            height: 2.5rem;
            display: block;
            left: -1.5rem;
            top: -1.5rem;
            position: relative;
            border-radius: 3rem 3rem 0;
            transform: rotate(45deg);
            border: 3px solid #FFFFFF`
        
    let myIcon = L.divIcon({
                className: "my-div-icon",
                iconAnchor: [0, 24],
                labelAnchor: [-6, 0],
                popupAnchor: [0, -36],
                html: `<span style="${markerHtmlStyles}" />`
            })
    
    d = dat.dTime ? dat.dTime.split("T")[0] : "Tidak Ada"
    
    L.marker([dat.Lat, dat.Long], {icon: myIcon}).addTo(map).bindPopup(`
        <div class="tb">
            <div class="fw-bold kode" style="background-color:${clr};" >${dat.kode}</div>
            <div style="margin:10px">
                <table class="tbl">
                    <tr>
                        <td class="fw-bold">Nama</td>
                        <td class="fw-bold ">:</td>
                        <td>${dat.Nama}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Tipe</td>
                        <td class="fw-bold ">:</td>
                        <td>${dat.Tipe}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Rekom</td>
                        <td class="fw-bold ">:</td>
                        <td>${dat.rekom}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Kerusakan</td>
                        <td class="fw-bold ">:</td>
                        <td>${dat.kerusakan}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Status Site</td>
                        <td class="fw-bold ">:</td>
                        <td><div style="color: white; background-color:${clr}; border-radius:10px;  text-align: center;" >${dat.Status_tele}</div></td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Status PM</td>
                        <td class="fw-bold ">:</td>
                        <td><div style="color: white; background-color:${clr1}; border-radius:10px;  text-align: center;" >${statuSPM}</div></td>
                    </tr>
                    
                    </table>
                    <div style="color:blue; margin-top:10px">Last PM ${d}</div>
            </div>
        </div>
        `)
}

