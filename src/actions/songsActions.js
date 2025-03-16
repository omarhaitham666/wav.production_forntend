import Swal from "sweetalert2";
import { API_ENDPOINT } from "../App";

export async function downloadSong(link){
    try {
        const response = await fetch(link);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const downloadLink  = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "CouldWav.mp3";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // 🔹 تحرير الذاكرة
        URL.revokeObjectURL(blobUrl);
        Swal.fire({
            title: 'تم التنزيل بنجاح',
            icon:'success',
            confirmButtonText: 'متابعة',
        })

    } catch (error) {
        Swal.fire({
            title: 'خطأ',
            text: "حدث خطا في التنزيل",
            icon: 'error',
            confirmButtonText: 'قم باعاده المحاولة لاحقا',
        });
    }

}

export async function addFavorite(song) {
    const response = await fetch(`${API_ENDPOINT}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
    });
    return await response.json();
}

