/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "~/components/ui/select";

import { VoyageFormSchema, VoyageFormSchemaDefaultValue, type VoyageFormSchemaType } from "~/lib/schemas/VoyageFormSchema";

import type { VesselsType } from "~/pages/api/vessel/getAll";
import type { VesselsType as UnitType } from "~/pages/api/unitType/getAll";
import { DateTimePicker } from "../ui/date-time-picker";

interface VoyageCreateProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void
    unitTypes: UnitType;
    vessels: VesselsType
    onSubmit: (data: VoyageFormSchemaType) => void;
}

export const VoyageCreate: React.FC<VoyageCreateProps> = ({ isOpen, unitTypes, vessels, setOpen, onSubmit }) => {
    const formData = useForm<VoyageFormSchemaType>({
        defaultValues: VoyageFormSchemaDefaultValue,
        resolver: zodResolver(VoyageFormSchema),
    });

    const { control, handleSubmit, formState: { isValid } } = formData;


    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className='flex w-full items-center justify-start'>
                    <Button aria-label="Create Voyage" variant="default">
                        Create
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                <Form {...formData}>
                    <SheetHeader>
                        <SheetTitle>Create New Voyage</SheetTitle>
                        <SheetDescription>
                            Click Submit when you are done.
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div className="mt-6">
                            <FormField
                                control={control}
                                name="departure"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel htmlFor="departure" className="text-left">Departure</FormLabel>
                                        <FormControl>
                                            <DateTimePicker
                                                granularity="second"
                                                jsDate={field.value}
                                                onJsDateChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={control}
                            name="arrival"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel htmlFor="arrival" className="text-left">Arrival</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            granularity="second"
                                            jsDate={field.value}
                                            onJsDateChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="portOfLoading"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel htmlFor="portOfLoading">Port of loading</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="portOfDischarge"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel htmlFor="portOfDischarge">Port of discharge</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="unitTypes"
                            render={() => (
                                <FormItem className="flex flex-col">
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Unit Types</FormLabel>
                                        <FormLabel>Select at least five Unit Types.</FormLabel>
                                    </div>
                                    <div className="h-28 overflow-scroll">
                                        {unitTypes?.map((unitType) => (
                                            <FormField
                                                key={unitType.id}
                                                control={control}
                                                name="unitTypes"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={unitType.id}
                                                            className="my-2 flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    aria-label={unitType.name}
                                                                    checked={field.value?.includes(unitType.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([
                                                                                ...field.value,
                                                                                unitType.id,
                                                                            ])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value: string) =>
                                                                                        value !== unitType.id,
                                                                                ),
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {unitType.name}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="vessel"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Vessel</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        aria-label="Select a Vessel"
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Vessel" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="-">Select a Vessel</SelectItem>
                                            {vessels?.map(
                                                (vessel: { value: string; label: string }) => (
                                                    <SelectItem key={vessel.value} value={vessel.value}>
                                                        {vessel.label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="submit" disabled={!isValid} className="w-full md:w-auto">Submit</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
