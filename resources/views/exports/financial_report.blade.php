<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Keuangan HiRent</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; color: #0e0e2c; font-size: 12px; line-height: 1.4; }
        .header { border-bottom: 2px solid #0e0e2c; padding-bottom: 15px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; color: #0e0e2c; margin: 0; }
        .subtitle { font-size: 12px; color: #8C8CA1; margin: 5px 0 0 0; }
        .meta-table { width: 100%; margin-bottom: 30px; }
        .meta-table td { padding: 3px 0; }
        .report-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .report-table th { bg-color: #0e0e2c; background: #0e0e2c; color: #ffffff; text-align: left; padding: 10px; font-weight: bold; font-size: 11px; text-transform: uppercase; }
        .report-table td { padding: 10px; border-bottom: 1px solid #ECF1F4; }
        .report-table tr:nth-child(even) { background-color: #FAFCFE; }
        .summary-box { background: #FAFCFE; border: 1px solid #ECF1F4; padding: 15px; float: right; width: 250px; border-radius: 8px; }
        .summary-row { display: block; margin-bottom: 5px; font-size: 12px; }
        .summary-total { font-size: 15px; font-weight: bold; color: #AB2A02; margin-top: 5px; border-top: 1px dashed #ddd; padding-top: 5px; }
        .right { text-align: right; }
    </style>
</head>
<body>

    <div class="header">
        <table style="width: 100%;">
            <tr>
                <td>
                    <h1 class="title">HiRent Laporan Keuangan</h1>
                    <p class="subtitle">Periode: {{ $startDate }} - {{ $endDate }}</p>
                </td>
                <td class="right">
                    <h3 style="margin: 0; color: #AB2A02;">STATUS: SEMUA SELESAI</h3>
                </td>
            </tr>
        </table>
    </div>

    <table class="meta-table">
        <tr>
            <td style="width: 15%;"><strong>Nama Owner:</strong></td>
            <td>{{ $ownerName }}</td>
            <td style="width: 20%;" class="right"><strong>Tanggal Cetak:</strong></td>
            <td style="width: 15%;" class="right">{{ $reportDate }}</td>
        </tr>
    </table>

    <table class="report-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Produk</th>
                <th>Penyewa</th>
                <th>Durasi</th>
                <th>Qty</th>
                <th class="right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @forelse($items as $index => $item)
                @php
                    $duration = \Carbon\Carbon::parse($item->rent_date)->diffInDays(\Carbon\Carbon::parse($item->return_date)) ?: 1;
                @endphp
                <tr>
                    <td style="width: 5%;">{{ $index + 1 }}</td>
                    <td style="font-weight: bold; width: 35%;">{{ $item->product->name }}</td>
                    <td>{{ $item->transaction->user->name }}</td>
                    <td>{{ $duration }} Hari</td>
                    <td>{{ $item->quantity }} Pcs</td>
                    <td class="right" style="font-weight: bold;">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center; color: #8C8CA1; padding: 20px;">
                        Tidak ada transaksi rental selesai pada periode ini.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="summary-box">
        <table style="width: 100%;">
            <tr>
                <td class="subtitle">Total Transaksi Selesai:</td>
                <td class="right" style="font-weight: bold;">{{ $totalOrders }} Pesanan</td>
            </tr>
            <tr class="summary-total">
                <td style="font-weight: bold; padding-top: 5px;">Total Pendapatan:</td>
                <td class="right" style="font-weight: bold; color: #AB2A02; padding-top: 5px;">
                    Rp {{ number_format($totalRevenue, 0, ',', '.') }}
                </td>
            </tr>
        </table>
    </div>

</body>
</html>