class CreateParmas < ActiveRecord::Migration[7.1]
  def change
    create_table :parmas do |t|
      t.string :title
      t.references :venue, null: false, foreign_key: true

      t.timestamps
    end
  end
end
