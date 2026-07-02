<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessPartnersController extends Controller
{
    // GO TO SUPPLIERS LIST PAGE
    public function goToSuppliersPage(Request $request){
           $query = Supplier::query();

            if ($request->filled('search')) {
                $query->where(function ($q) use ($request) {
                    $q->where('supplier_code', 'like', "%{$request->search}%")
                    ->orWhere('name', 'like', "%{$request->search}%")
                    ->orWhere('contact_person', 'like', "%{$request->search}%");
                });
            }

            if ($request->status === 'active') {
                $query->where('is_active', true);
            }

            if ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
            $perPage = $request->input('per_page', 10);
            $suppliers = $query
                ->orderBy('name')
                ->paginate($request->per_page ?? 10)
                ->withQueryString();
           
            return Inertia::render('admin/bpSuppliersList',[
                'suppliersList' => $suppliers,
                'filters' => [
                    'search' => $request->search ?? '',
                    'status' => $request->status ?? 'all',
                    'per_page' => $perPage,

                ],
            ]);
    }

    // GO TO ADD SUPPLIER PAGE
    public function goToSupplierAddPage(){
            $lastSupplier = Supplier::latest('id')->first();
            if ($lastSupplier) {
                $number = (int) str_replace('SUP-', '', $lastSupplier->supplier_code);
                $supplierCode = 'SUP-' . str_pad($number + 1, 5, '0', STR_PAD_LEFT);
            } else {
                $supplierCode = 'SUP-00001';
            }
        return Inertia::render('admin/bpSuppliersAdd',[
            'supplierCode' => $supplierCode,
        ]);
    }

         //Generate the next supplier code.
    private function generateSupplierCode(): string {
        $lastSupplier = Supplier::latest('id')->first();
        if (!$lastSupplier) {
            return 'SUP-00001';
        }
        $lastNumber = (int) str_replace('SUP-', '', $lastSupplier->supplier_code);
        return 'SUP-' . str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
    }

    // SAVE NEW SUPPLIER
    public function saveNewSupplier(Request $request){
         $incomingFields = $request->validate([
                'name' => ['required','string','max:150','unique:suppliers,name',],
                'contact_person' => ['required','string','max:100',],
                'contact_number' => ['required','regex:/^[0-9+\-\s()]+$/','max:25',],
                'email' => ['nullable','email','max:150','unique:suppliers,email',],
                'tin_number' => ['nullable','string','max:50',],
                'address' => ['nullable','string','max:255',],
                'remarks' => ['nullable','string','max:1000',],
                'is_active' => ['required','boolean',],
            ]);
            $incomingFields['supplier_code'] = $this->generateSupplierCode();

            Supplier::create($incomingFields);
        
        }

        public function editSupplierDetails($id){
            $supplierDetails = Supplier::where('id','=',$id)->firstOrFail();

            return Inertia::render('admin/bpSuppliersEdit',['supplierDetails' => $supplierDetails]);
        }
}
