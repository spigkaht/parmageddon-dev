class ChangeZiptoPostcodeInVenues < ActiveRecord::Migration[7.1]
  def change
    rename_column :venues, :zip, :postcode
  end
end
